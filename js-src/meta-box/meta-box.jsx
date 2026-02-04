import { createStore } from 'solid-js/store';
import { createSignal, createEffect, onCleanup, Show } from "solid-js";

import Button from '../components/button/button.jsx';
import Loading from '../components/loading/loading.jsx';
import { wpAjaxAction } from '../utilities/wp-action.js';
import { StyledContainer, StyledStatusText, StyledChecking } from './meta-box.style.jsx';

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

    createEffect(() => {
        if (options.metaMenu) {
            saveMenuButton = document.querySelector('#save_menu_footer');
            const cleanup = menuChangeListener();
            onCleanup(() => {
                if (cleanup) cleanup();
            });
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
        let clickHandler;

        const handleCerberusEvent = (payload) => {
            if (payload?.detail?.hasChange) {
                if (!saveContentButton) {
                    saveContentButton = document.querySelector('.editor-post-publish-button');

                    if (!saveContentButton) return;

                    clickHandler = () => {
                        setUnsavedExternalChange(false);
                        saveContentButton.setAttribute('disabled', true);
                    };
                    saveContentButton.addEventListener('click', clickHandler);
                }
                if (saveContentButton) {
                    setUnsavedExternalChange(true);
                    saveContentButton.removeAttribute('disabled');
                }
            }
        };

        document.addEventListener("cerberusListenerEvent", handleCerberusEvent);

        onCleanup(() => {
            document.removeEventListener("cerberusListenerEvent", handleCerberusEvent);
            if (saveContentButton && clickHandler) {
                saveContentButton.removeEventListener('click', clickHandler);
            }
        });
    });

    const pageChangeListener = () => {
        let saveContentButton;

        const unsubscribe = wp.data.subscribe( _.debounce( ()=> {
            if (!saveContentButton) {
                saveContentButton = document.querySelector('.editor-post-publish-button');
            }

            if (!saveContentButton) {
                return;
            }

            const hasUnsavedChanges = coreEditor.isEditedPostDirty();
            const hasNonPostEntityChanges = coreEditor.hasNonPostEntityChanges();
            const hasUnsavedExternalChange = unsavedExternalChange();

            if (hasNonPostEntityChanges || hasUnsavedChanges || hasUnsavedExternalChange) {
                setUnsavedPageChanges(true);
                saveContentButton.removeAttribute('disabled');
                unsubscribe();
            } else {
                setUnsavedPageChanges(false);
                saveContentButton.setAttribute('disabled', true);
            }
        }, 100 ) );
    }


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

        // Return cleanup function
        return () => {
            clearInterval(menuChangeDetectingInterval);
            window.removeEventListener('blur', blurListener);
            window.removeEventListener('focus', focusListener);
        };
    }

    const enableMenuSaveButton = () => {
        saveMenuButton.removeAttribute('disabled');
        setUnsavedMenuChanges(true);
    }

    // Helper functions for menuCheck
    const updateFieldsetState = (fieldset, isDisabled) => {
        if (isDisabled) {
            fieldset.style.pointerEvents = 'none';
            fieldset.style.cursor = 'not-allowed';
            fieldset.style.opacity = 0.5;
        } else {
            fieldset.style.pointerEvents = 'auto';
            fieldset.style.cursor = 'default';
            fieldset.style.opacity = 1;
        }
    };

    const updateDisabledMessage = (fieldset, message) => {
        let messageElement = document.querySelector('.changes-disabled-message');

        if (message) {
            if (messageElement) {
                messageElement.innerHTML = message;
            } else {
                messageElement = document.createElement('i');
                messageElement.classList.add('changes-disabled-message');
                messageElement.innerHTML = message;
                fieldset.prepend(messageElement);
            }
        } else {
            if (messageElement) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }
    };

    const setupLocationListeners = (displayLocations) => {
        let currentMenuIsRegisteredToLocation = false;
        let locationsSetToOtherMenus = false;

        for (let locationElement of displayLocations) {
            const input = locationElement.querySelector('input');

            // Only add listener once to prevent memory leaks
            if (!input.dataset.cerberusListenerAdded) {
                input.addEventListener('change', () => {
                    setUnsavedMenuDisplayLocations(true);
                    enableMenuSaveButton();
                });
                input.dataset.cerberusListenerAdded = 'true';
            }

            const locationAlreadySet = locationElement.querySelector('.theme-location-set');

            if (locationAlreadySet) {
                // Get the location name from the input's name attribute (e.g., "menu-locations[header_menu]")
                const locationName = input.name.match(/menu-locations\[([^\]]+)\]/)?.[1];

                // Check if this location is taken by a menu in the SAME language
                const isInSameLanguage = options.locationLanguages &&
                                        locationName &&
                                        options.locationLanguages[locationName] === options.currentLanguage;

                // Only disable if location is taken by a menu in the same language
                if (isInSameLanguage) {
                    input.setAttribute('disabled', true);
                    locationElement.style.pointerEvents = 'none';
                    locationElement.style.opacity = 0.5;
                    locationsSetToOtherMenus = true;
                } else {
                    // Location is taken by a different language - allow assignment
                    input.removeAttribute('disabled');
                    locationElement.style.pointerEvents = 'auto';
                    locationElement.style.opacity = 1;
                }
            }

            if (input.getAttribute('checked')) {
                currentMenuIsRegisteredToLocation = true;
            }
        }

        return { currentMenuIsRegisteredToLocation, locationsSetToOtherMenus };
    };

    const updateDeleteLink = (isDisabled) => {
        const deleteLink = document.querySelector('.submitdelete.deletion.menu-delete');
        if (!deleteLink) return;

        let linkReplacement = document.querySelector('.delete-link-replacement');

        if (isDisabled) {
            deleteLink.style.display = 'none';

            if (!linkReplacement) {
                linkReplacement = document.createElement('span');
                linkReplacement.classList.add('delete-link-replacement');
                linkReplacement.innerHTML = 'To delete a menu it must be unpublished (and unregisterered from all display locations)';
                linkReplacement.style.color = '#a7aaad';
                linkReplacement.style.fontSize = '12px';
                deleteLink.parentNode.prepend(linkReplacement);
            } else {
                linkReplacement.style.display = 'inline';
            }
        } else {
            deleteLink.style.display = 'inline';
            if (linkReplacement) {
                linkReplacement.style.display = 'none';
            }
        }
    };

    const check = async (showChecking = true) => {

        if (showChecking) {
            setChecking(true);
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

        const existsInDraft = status.draft?.exists;
        const isPublished = status.live && status.live.exists;

        // Update fieldset state (disabled if not in draft or if published)
        updateFieldsetState(fieldset, !existsInDraft || isPublished);

        // Update disabled messages based on state
        if (isPublished) {
            updateDisabledMessage(fieldset, 'Menu must be unpublished before toggling location');
        } else if (!existsInDraft) {
            updateDisabledMessage(fieldset, 'Menu must be created before toggling location');
        } else {
            updateDisabledMessage(fieldset, null); // Clear message
        }

        // Setup location input listeners and check states
        const { currentMenuIsRegisteredToLocation, locationsSetToOtherMenus } = setupLocationListeners(displayLocations);

        // Show additional message if some locations are already set
        if (locationsSetToOtherMenus && !isPublished && existsInDraft) {
            updateDisabledMessage(fieldset, 'Some locations cannot be set because they are already set');
        }

        // Early return if menu hasn't been created yet
        if (location.search.includes('menu=0')) return;

        setMenuCreated(true);

        // Update delete link visibility
        updateDeleteLink(currentMenuIsRegisteredToLocation || isPublished);
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
        setPublishing(false);

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
        setUnpublishing(false);

        emitDomEvent({
            action: 'unpublish_from_live_done'
        });
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
                        <Button leftMargin={options.metaMenu} loading={publishing()} onClick={ (e) => publish(e)} disabled={ unsavedPageChanges() || unsavedMenuChanges() || unsavedExternalChange()}>
                            { unsavedPageChanges() || unsavedMenuChanges() || unsavedExternalChange() ? 'Save draft before publishing to live' : 'Publish to live site' }
                        </Button>
                        <Button leftMargin={options.metaMenu} disabled={!status.live?.synced}>
                            Content not published
                        </Button>
                    </Show>

                    <Show when={status.live?.exists}>
                        <Button leftMargin={options.metaMenu} loading={publishing()} onClick={ (e) => publish(e) } disabled={status.live?.synced || unsavedPageChanges() || unsavedMenuChanges() || unsavedExternalChange()}>
                            { unsavedPageChanges() || unsavedMenuChanges() || unsavedExternalChange() ?
                                'Save draft before updating on live'
                                : status.live?.synced ? 'Updated on live site' : 'Update on live site'
                            }
                        </Button>
                        {/* The button below is disabled when some external source has indicated that a change has been made. This is to avoid unpublishing wrong content. */}
                        <Button leftMargin={options.metaMenu} loading={unpublishing()} onClick={ (e) => unpublish(e) } disabled={unsavedExternalChange()}>
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
