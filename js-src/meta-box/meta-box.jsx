import { createStore } from 'solid-js/store';
import { createSignal, createEffect, Show } from "solid-js";

import Button from '../components/button/button.jsx';
import Loading from '../components/loading/loading.jsx';
import { wpAjax, wpAjaxAction } from '../utilities/wp-action.js';
import { StyledContainer, StyledStatusText, StyledChecking } from './meta-box.style.jsx';

const MetaBox = ({options}) => {

    const [ status, setStatus ] = createStore({ });
    const [ checking, setChecking ] = createSignal(true);
    const [ publishing, setPublishing ] = createSignal(false);
    const [ unpublishing, setUnpublishing ] = createSignal(false);
    const [ unsavedMenuDisplayLocations, setUnsavedMenuDisplayLocations ] = createSignal(false);
    const [ unsavedPageChanges, setUnsavedPageChanges ] = createSignal(false);
    const [ unsavedMenuChanges, setUnsavedMenuChanges ] = createSignal(false);
    const [ menuCreated, setMenuCreated ] = createSignal(false);
    const [ noContentFound, setNoContentFound ] = createSignal(false);

    const payload = {
        permalink: options.permalink,
    };

    const coreEditor = wp.data.select( 'core/editor' );

    // Dont run this if its an older version of wp or not running gutenberg
    createEffect(() => {
        if (wp && wp.hooks && wp.hooks.addAction) {

            check();

            wp.hooks.addAction('dls.post-saved', 'dls', () => {
                if (payload.permalink.includes('/?') && payload.permalink.includes('_id=')) { // It's the first time it's being saved, so reload to get correct permalink
                    const { isSavingPost } = coreEditor
                    let safetyCounter = 0;
    
                    const savingInternal = setInterval(() => {
                        if (!isSavingPost() || safetyCounter >= 50) {
                            location.reload()
                            clearInterval(savingInternal)
                        }
                    }, 100)

                    return
                }
                
                check();
            });
        }
    });

    createEffect(() => {
        if (options.metaMenu) {
            menuChangeListener();
        } else {
            if (wp) wp.domReady(pageChangeListener);
        }
    });

    const pageChangeListener = () => {
        let saveContentButton;
        
        wp.data.subscribe( _.debounce( ()=> {
            if (!saveContentButton) {
                saveContentButton = document.querySelector('.editor-post-publish-button')
            }

            const hasUnsavedChanges = coreEditor.isEditedPostDirty();
            const hasNonPostEntityChanges = coreEditor.hasNonPostEntityChanges();
            
            if (hasNonPostEntityChanges || hasUnsavedChanges) {
                setUnsavedPageChanges(true)
                saveContentButton.removeAttribute('disabled');
            } else {
                setUnsavedPageChanges(false)
                saveContentButton.setAttribute('disabled', true);
            }
        }, 300 ) );
    }

    
    const menuChangeListener = () => { // Listens for changes to enable/disable saving button
        let menuHasChanged = false
        let menuChangeDetectingInterval

        const saveButton = document.querySelector('#save_menu_footer')
        saveButton.setAttribute('disabled', true)

        let blurListener = () => {
            if (menuHasChanged) return
            clearInterval(menuChangeDetectingInterval)
        }

        let focusListener = () => {
            if (menuHasChanged) return
            menuChangeDetectingInterval = runInterval()
        }
        
        const runInterval = () => setInterval(() => {
            if (window?.wpNavMenu?.menusChanged) {
                menuHasChanged = true;
                saveButton.removeAttribute('disabled');
                setUnsavedMenuChanges(true);

                clearInterval(menuChangeDetectingInterval);

                window.removeEventListener('blur', blurListener)
                window.removeEventListener('focus', focusListener);
            }
        }, 500)

        menuChangeDetectingInterval = runInterval();

        window.addEventListener('blur', blurListener)
        window.addEventListener('focus', focusListener);
    }

    const check = async (showChecking = true) => {

        if (showChecking) {
            setChecking(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        try {
            const result = await wpAjax(`${options.api}/check-sync.php`, payload);

            if (!result?.data?.resourceStatus) {
                throw(payload);
            }

            setStatus({
                draft: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'draft' && itemStatus.comparedTo === '__original'),
                live: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
                state: 'loaded',
            });

            setNoContentFound(false);

            if (options.metaMenu) {
                menuCheck();
            }
        } catch (err) {
            console.log('--- meta-box --- Can\'t find any data with check-sync of payload: ', err);

            setNoContentFound(true);

            setChecking(false);
            setStatus({ state: 'error' });
        }

        setChecking(false);

    };

    const menuCheck = async () => {
        /**
         * Orchestrates saving to draft/publishing when the menu is registered to a location (e.g. header_menu),
         * ensuring that content is saved correctly and making it more obvious for the editor about
         * what is saved/published (the "stand-alone" menu, and/or the menu registered to a location)
         */
         
        const displayLocations = document.querySelectorAll('.menu-theme-locations > .menu-settings-input');
        const deleteLink = document.querySelector('.submitdelete.deletion.menu-delete');
        const fieldset = document.querySelector('.menu-settings-group.menu-theme-locations');

        const changesDisabledInfo = document.createElement('i');
        changesDisabledInfo.classList.add('changes-disabled-message');

        const savedToDraft = status.draft?.exists;
        const isPublished = status.live && status.live.exists;

        if (!savedToDraft || isPublished) {
            fieldset.style.pointerEvents = 'none';
            fieldset.style.cursor = 'not-allowed';
            fieldset.style.opacity = 0.5;
        } else {
            fieldset.style.pointerEvents = 'auto';
            fieldset.style.cursor = 'default';
            fieldset.style.opacity = 1;
        }

        const changesDisabledEl = document.querySelector('.changes-disabled-message');
        if (isPublished) {
            const publishedMessage = 'Menu must be unpublished before toggling location'
            
            if (changesDisabledEl) {
                changesDisabledEl.innerHTML = publishedMessage
            } else {
                changesDisabledInfo.innerHTML = publishedMessage;
                fieldset.prepend(changesDisabledInfo);
            }
        } else {
            const notSavedMessage = 'Menu must be saved to draft before toggling location'
            if (!savedToDraft) {
                if (changesDisabledEl) {
                    changesDisabledEl.innerHTML = notSavedMessage
                } else {
                    changesDisabledInfo.innerHTML = notSavedMessage;
                    fieldset.prepend(changesDisabledInfo);
                }
            } else {
                if (changesDisabledEl) changesDisabledEl.parentNode.removeChild(changesDisabledEl);
            }
        }

        let currentMenuIsRegisteredToLocation = false;

        let locationsSetToOtherMenus = false;
        for (let locationElement of displayLocations) {
            const input = locationElement.querySelector('input');
            input.addEventListener('change', () => setUnsavedMenuDisplayLocations(true));

            const locationPriorlySet = locationElement.querySelector('.theme-location-set')

            if (locationPriorlySet) {
                input.setAttribute('disabled', true)
                locationElement.style.pointerEvents = 'none';
                locationElement.style.opacity = 0.5;
                locationsSetToOtherMenus = true;
            }

            if (input.getAttribute('checked')) {
                currentMenuIsRegisteredToLocation = true;
            }
        }

        if (locationsSetToOtherMenus && !isPublished) {
            const changesDisabledMessageExists = document.querySelector('.changes-disabled-message');
            const locationsDisabledText = 'Some locations cannot be set until they have been unset from their original menu'

            if (changesDisabledMessageExists) {
                changesDisabledMessageExists.innerHTML = locationsDisabledText
            } else {
                changesDisabledInfo.innerHTML = locationsDisabledText
                fieldset.prepend(changesDisabledInfo);
            }
        }

        if (!deleteLink) return;

        setMenuCreated(true);
        let linkReplacement = document.querySelector('.delete-link-replacement');        

        if (currentMenuIsRegisteredToLocation || isPublished) {
            deleteLink.style.display = 'none';

            if (!linkReplacement) {
                linkReplacement = document.createElement('span');
                linkReplacement.classList.add('delete-link-replacement');
                linkReplacement.innerHTML = 'To delete a menu it must be unpublished (and unregisterered from all display locations)';
                linkReplacement.style.color = '#a7aaad';
                linkReplacement.style.fontSize = '12px';
            } else {
                linkReplacement.style.display = 'inline';
            }

            deleteLink.parentNode.prepend(linkReplacement);

        } else {
            deleteLink.style.display = 'inline';
            if (linkReplacement) linkReplacement.style.display = 'none';
        }
    }

    const publish = async (e) => {

        // If we dont stop the event, the options page in wp is saved by ACF
        e.preventDefault();
        e.stopPropagation();

        setPublishing(true);
        const result = await wpAjaxAction('publish_to_live', payload);
        if (result.data) {
            check(false);
        } else {
            setStatus({ state: 'error' });
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPublishing(false);

    };

    const unpublish = async (e) => {

        // If we dont stop the event, the options page in wp is saved by ACF
        e.preventDefault();
        e.stopPropagation();

        setUnpublishing(true); 

        const result = await wpAjaxAction('unpublish_from_live', payload);
        if (result.data) {
            check(false);
        } else {
            setStatus({ state: 'error' });
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUnpublishing(false);

    };
 
    return (
        <StyledContainer horizontal={options.metaMenu} box={options.optionsMeta}>

            <Show when={checking()}>
                <StyledChecking horizontal={options.metaMenu}>
                    <Loading size={ options.metaMenu ? 'small' : 'large' } />
                    <StyledStatusText>Checking content in draft and live</StyledStatusText>
                </StyledChecking>
            </Show>

            <Show when={!checking()}>
                <Show when={noContentFound()}>
                    <StyledChecking horizontal={options.metaMenu}>
                        <StyledStatusText>Content must be saved before publishing</StyledStatusText>
                    </StyledChecking>
                </Show>
                
                <Show when={!unsavedMenuDisplayLocations() && status.draft?.exists}>
                    <StyledStatusText horizontal={options.metaMenu}>Publish content</StyledStatusText>

                    <Show when={!status.live?.exists}>
                        <Button leftMargin={options.metaMenu} loading={publishing()} onClick={ (e) => publish(e)} disabled={ unsavedPageChanges() || unsavedMenuChanges() }>
                            { unsavedPageChanges() || unsavedMenuChanges() ? 'Save draft before publishing to live' : 'Publish to live site' }
                        </Button>
                        <Button leftMargin={options.metaMenu} disabled={!status.live?.synced}> 
                            Content not published
                        </Button>
                    </Show>

                    <Show when={status.live?.exists}>
                        <Show when={status.live?.synced}>
                            <Button leftMargin={options.metaMenu} loading={publishing()} disabled={true}>
                                { unsavedPageChanges() || unsavedMenuChanges() ? 'Save draft before updating on live' : 'Updated on live site' }
                            </Button>
                        </Show>

                        <Show when={!status.live?.synced}>
                            <Button leftMargin={options.metaMenu} loading={publishing()} onClick={ (e) => publish(e) }>
                                { unsavedPageChanges() || unsavedMenuChanges() ? 'Save draft before updating on live' : 'Update on live site'}
                            </Button>
                        </Show>

                        <Button leftMargin={options.metaMenu} loading={unpublishing()} onClick={ (e) => unpublish(e) }>
                            Unpublish
                        </Button>
                    </Show>
                </Show>

                <Show when={options.metaMenu}>
                    <StyledChecking horizontal={options.metaMenu}>
                        <Show when={!menuCreated()}>
                            <StyledStatusText>Enter a 'Menu Name' above to create a new menu</StyledStatusText>
                        </Show>
                        <Show when={!unsavedMenuDisplayLocations() && !status.draft?.exists && menuCreated()}>
                            <StyledStatusText>Save menu with menu items in order to publish</StyledStatusText>
                        </Show>
                        <Show when={unsavedMenuDisplayLocations()}>
                            <StyledStatusText>Save the changes before publishing</StyledStatusText>
                        </Show>
                    </StyledChecking>
                </Show>
            </Show>

            <Show when={options.enableTestContent}>
                <Button leftMargin={options.metaMenu} loading={unpublishing()} onClick={ (e) => unpublish(e) } disabled={!status.test?.synced}>
                    { status.test && status.test.synced ? 'Unpublish from test target' : 'Publish to test target' }
                </Button>
            </Show>
            <Show when={options.enableDiffButton}>
                <Button leftMargin={options.metaMenu}>Show diff (raw)</Button>
            </Show>
            
        </StyledContainer>
    );

};

export default MetaBox;
