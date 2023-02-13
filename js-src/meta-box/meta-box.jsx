import { createStore } from 'solid-js/store';
import { createSignal, createEffect, Show, onMount } from "solid-js";
import Button from '../components/button/button.jsx';
import Loading from '../components/loading/loading.jsx';
import { wpAjaxAction } from '../utilities/wp-action.js';
import { StyledContainer, StyledStatusText, StyledChecking, StyledError } from './meta-box.style.jsx';
import { 
    contentStatus,
    setContentStatus,
    withdrawRequestOnNewDraft,
    withdrawPublicationRequest,
    getPublicationRequest,
} from './publication-approval/publication-approval-store.jsx';
import PublicationApprovalStatus from './publication-approval/publication-approval-status.jsx';
import PublishingControls from './publication-approval/publishing-controls.jsx'
import PublicationWarning from './publication-approval/publication-warning.jsx';
import PublishingUpdateControls from './publication-approval/publishing-update-controls.jsx';

const MetaBox = ({options}) => {

    const [ status, setStatus ] = createStore({ });
    const [ checking, setChecking ] = createSignal(true);
    const [ publishing, setPublishing ] = createSignal(false);
    const [ unpublishing, setUnpublishing ] = createSignal(false);
    const [ unsavedMenuDisplayLocations, setUnsavedMenuDisplayLocations ] = createSignal(false);
    const [ unsavedPageChanges, setUnsavedPageChanges ] = createSignal(false);
    const [ unsavedMenuChanges, setUnsavedMenuChanges ] = createSignal(false);
    const [ unsavedExternalChange, setUnsavedExternalChange ] = createSignal(false);
    const [ menuCreated, setMenuCreated ] = createSignal(false);
    const [ noContentFound, setNoContentFound ] = createSignal(false);

    const payload = {
        permalink: options.permalink,
    };

    let coreEditor;
    let saveMenuButton;

    onMount(() => {
        if (options.requireApproval) {
            setContentStatus({ 
                options: options,
                setChecking: setChecking,
                syncStatus: status,
                publish: (e) => publish(e),
            });
        }
    })

    createEffect(() => {
        if (options.metaMenu) {
            saveMenuButton = document.querySelector('#save_menu_footer');
            menuChangeListener();
        } else {
            if (wp?.data?.select) {
                coreEditor = wp.data.select( 'core/editor' );
                wp.domReady(pageChangeListener);
            }
        }
    });

    // Dont run this if its an older version of wp or not running gutenberg
    createEffect(() => {
        if (wp && wp.hooks && wp.hooks.addAction) {

            check();

            wp.hooks.addAction('dls.post-saved', 'dls', () => {
                if (!status?.draft?.exists && coreEditor?.isPublishingPost()) {
                    /**
                     * It's the first time content is being saved to draft  (disregarding wordpress' autosave),
                     * so reload to get correct permalink (which is needed to e.g. unpublish)
                     * 
                     * NB: This wordpress' publishing - NOT the same as cerberus' publish to live database
                     */
                    
                    const { isSavingPost } = coreEditor;
                    let safetyCounter = 0;
                    
                    const savingInterval = setInterval(() => {
                        if (!isSavingPost() || safetyCounter >= 50) {
                            location.reload();
                            clearInterval(savingInterval);
                        }
                    }, 100)
                    
                    return;
                }

                if (!status?.draft?.exists) return; // Wordpress is autosaving content that doesn't yet exist 

                // Content has been updated on draft, listen for further changes
                pageChangeListener();
                check();
            });
        }
    });

    createEffect(() => {
        let saveContentButton;
        document.addEventListener("cerberusListenerEvent", (payload) => {
            if (payload?.detail?.hasChange) {
                if (!saveContentButton) {
                    saveContentButton = document.querySelector('.editor-post-publish-button');
                    saveContentButton.addEventListener('click', () => {
                        setUnsavedExternalChange(false);
                        saveContentButton.setAttribute('disabled', true);
                    });
                }
                if (saveContentButton) {
                    setUnsavedExternalChange(true);
                    saveContentButton.removeAttribute('disabled');
                }                
            }
        });
    });

    const pageChangeListener = () => {
        let saveContentButton;
        
        const unsubscribe = wp.data.subscribe( _.debounce( ()=> {
            if (!saveContentButton) {
                saveContentButton = document.querySelector('.editor-post-publish-button');
            }

            const hasUnsavedChanges = coreEditor.isEditedPostDirty();
            const hasNonPostEntityChanges = coreEditor.hasNonPostEntityChanges();
            const hasUnsavedExternalChange = unsavedExternalChange();

            if (hasNonPostEntityChanges || hasUnsavedChanges || hasUnsavedExternalChange) {
                setUnsavedPageChanges(true);
                saveContentButton.addEventListener('click', savingToDraftHandler);
                saveContentButton.removeAttribute('disabled');
                unsubscribe();
            } else {
                setUnsavedPageChanges(false);
                saveContentButton.removeEventListener('click', savingToDraftHandler);
                saveContentButton.setAttribute('disabled', true);
            }
        }, 100 ) );
    };

    const savingToDraftHandler = () => {
        if (options.requireApproval) {
            withdrawRequestOnNewDraft();
        }
    };

    
    const menuChangeListener = () => { // Listens for changes to enable/disable saving button
        let menuHasChanged = false;
        let menuChangeDetectingInterval;

        saveMenuButton.setAttribute('disabled', true);

        let blurListener = () => {
            if (menuHasChanged) return;
            clearInterval(menuChangeDetectingInterval);
        }

        let focusListener = () => {
            if (menuHasChanged) return;
            menuChangeDetectingInterval = runInterval();
        }
        
        const runInterval = () => setInterval(() => {
            if (window?.wpNavMenu?.menusChanged) {
                menuHasChanged = true;
                enableMenuSaveButton();

                clearInterval(menuChangeDetectingInterval);

                window.removeEventListener('blur', blurListener);
                window.removeEventListener('focus', focusListener);
            }
        }, 500)

        menuChangeDetectingInterval = runInterval();

        window.addEventListener('blur', blurListener);
        window.addEventListener('focus', focusListener);
    }

    const enableMenuSaveButton = () => {
        saveMenuButton.removeAttribute('disabled');
        setUnsavedMenuChanges(true);
    }

    const check = async (showChecking = true) => {

        if (showChecking) {
            setChecking(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        try {
            const result = await wpAjaxAction('check_sync', {...payload, api_path: payload.permalink});
            if (!result?.data?.resourceStatus) {
                throw(payload);
            }

            setStatus({
                draft: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'draft' && itemStatus.comparedTo === '__original'),
                live: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
                state: 'loaded',
            });

            setNoContentFound(false);

            if (options.requireApproval) {
                getPublicationRequest();
            }

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
        const fieldset = document.querySelector('.menu-settings-group.menu-theme-locations');

        const changesDisabledInfo = document.createElement('i');
        changesDisabledInfo.classList.add('changes-disabled-message');

        const existsInDraft = status.draft?.exists;
        const isPublished = status.live && status.live.exists;

        if (!existsInDraft || isPublished) {
            fieldset.style.pointerEvents = 'none';
            fieldset.style.cursor = 'not-allowed';
            fieldset.style.opacity = 0.5;
        } else {
            fieldset.style.pointerEvents = 'auto';
            fieldset.style.cursor = 'default';
            fieldset.style.opacity = 1;
        }

        const changesDisabledDOM = document.querySelector('.changes-disabled-message');
        if (isPublished) {
            const publishedMessage = 'Menu must be unpublished before toggling location';
            
            if (changesDisabledDOM) {
                changesDisabledDOM.innerHTML = publishedMessage;
            } else {
                changesDisabledInfo.innerHTML = publishedMessage;
                fieldset.prepend(changesDisabledInfo);
            }
        } else {
            const notSavedMessage = 'Menu must be created before toggling location';
            if (!existsInDraft) {
                if (changesDisabledDOM) {
                    changesDisabledDOM.innerHTML = notSavedMessage;
                } else {
                    changesDisabledInfo.innerHTML = notSavedMessage;
                    fieldset.prepend(changesDisabledInfo);
                }
            } else {
                if (changesDisabledDOM) changesDisabledDOM.parentNode.removeChild(changesDisabledDOM);
            }
        }

        let currentMenuIsRegisteredToLocation = false;

        let locationsSetToOtherMenus = false;
        for (let locationElement of displayLocations) {
            const input = locationElement.querySelector('input');
            input.addEventListener('change', () => {
                setUnsavedMenuDisplayLocations(true);
                enableMenuSaveButton();
            });

            const locationAlreadySet = locationElement.querySelector('.theme-location-set');

            if (locationAlreadySet) {
                input.setAttribute('disabled', true);
                locationElement.style.pointerEvents = 'none';
                locationElement.style.opacity = 0.5;
                locationsSetToOtherMenus = true;
            }

            if (input.getAttribute('checked')) {
                currentMenuIsRegisteredToLocation = true;
            }
        }

        if (locationsSetToOtherMenus && !isPublished && existsInDraft) {
            const changesDisabledMessageExists = document.querySelector('.changes-disabled-message');
            const locationsDisabledText = 'Some locations cannot be set because they are already set';

            if (changesDisabledMessageExists) {
                changesDisabledMessageExists.innerHTML = locationsDisabledText;
            } else {
                changesDisabledInfo.innerHTML = locationsDisabledText;
                fieldset.prepend(changesDisabledInfo);
            }
        }

        if (location.search.includes('menu=0')) return; // Menu has not yet been created and given a unique ID

        setMenuCreated(true);
        const deleteLink = document.querySelector('.submitdelete.deletion.menu-delete');
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

    const emitDomEvent = (detail = {}) => {
        if (document) {
            const domPublishEvent = new CustomEvent('cerberusChangeEvent', { detail });
            document.dispatchEvent(domPublishEvent);
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
        withdrawPublicationRequest()

        emitDomEvent({
            action: 'publish_to_live_done'
        });
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

        emitDomEvent({
            action: 'unpublish_from_live_done'
        });
    };

    createEffect(() => {
        setContentStatus({changesNotSavedToDraft: changesNotSavedToDraft()})
    })

    createEffect(() => {
        setContentStatus({publishing: publishing()})
    })

    createEffect(() => {
        setContentStatus({publishing: publishing()})
    })

    const changesNotSavedToDraft = () => {
        return unsavedPageChanges() || unsavedMenuChanges() || unsavedExternalChange();
    };    
        
    const publishingControls = () => {
        if (options.requireApproval) {
            return <PublishingControls />
        }

        return (
            <Button leftMargin={options.metaMenu} loading={publishing()} onClick={ (e) => publish(e)} disabled={ changesNotSavedToDraft() }>
                { changesNotSavedToDraft() ? 'Save draft before publishing to live' : 'Publish to live site' }
            </Button>
        )
    }

    const publishUpdateButtons = () => {
        if (options.requireApproval) {
            return <PublishingUpdateControls/>
        };

        return (
            <Button leftMargin={options.metaMenu} loading={publishing()} onClick={ (e) => publish(e) } disabled={status.live?.synced || changesNotSavedToDraft()}>
                { changesNotSavedToDraft() ? 
                    'Save draft before updating on live' 
                    : status.live?.synced ? 'Updated on live site' : 'Update on live site'
                }
            </Button>
        );
    }

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
                    <Show when={options.requireApproval}>
                        <PublicationApprovalStatus/>
                    </Show>
                    <Show when={!options.requireApproval}>
                        <StyledStatusText horizontal={options.metaMenu}>Publish content</StyledStatusText>
                    </Show>

                    <Show when={!status.live?.exists}>
                        { publishingControls() }
                        <Button leftMargin={options.metaMenu} disabled={true}> 
                            Content not published
                        </Button>
                        <PublicationWarning/>
                    </Show>

                    <Show when={status.live?.exists}>
                        { publishUpdateButtons() }
                        {/* The button below is disabled when some external source has indicated that a change has been made. This is to avoid unpublishing wrong content. */}
                        <Button leftMargin={options.metaMenu} loading={unpublishing()} onClick={ (e) => unpublish(e) } disabled={unsavedExternalChange()}>
                            Unpublish
                        </Button>
                        <PublicationWarning/>
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

            <Show when={contentStatus.errorMessage}>
                <StyledError>{contentStatus.errorMessage}</StyledError>
            </Show>

        </StyledContainer>
    );

};

export default MetaBox;
