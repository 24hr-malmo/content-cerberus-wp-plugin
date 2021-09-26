import { createStore } from 'solid-js/store';
import { createSignal, createEffect } from "solid-js";

import Button from '../components/button/button.jsx';
import Loading from '../components/loading/loading.jsx';
import { wpAjax, wpAjaxAction } from '../utilities/wp-action.js';
import { StyledContainer, StyledStatusText, StyledChecking } from './meta-box.style.jsx';

const MetaBox = ({options}) => {

    const [ status, setStatus ] = createStore({ });
    const [ checking, setChecking ] = createSignal(true);
    const [ publishing, setPublishing ] = createSignal(false);
    const [ unpublishing, setUnpublishing ] = createSignal(false);

    const payload = {
        permalink: options.permalink,
    };

    // Dont run this if its an older version of wp or not running gutenberg
    createEffect(() => {
        if (wp && wp.hooks && wp.hooks.addAction) {
            check();
            wp.hooks.addAction('dls.post-saved', 'dls', () => {
                check(false);
            });
        }
    });

    const check = async (showChecking = true) => {

        if (showChecking) {
            setChecking(true);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        try {
            const result = await wpAjax(`${options.api}/check-sync.php`, payload);
            setStatus({
                draft: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'draft' && itemStatus.comparedTo === '__original'),
                live: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
                state: 'loaded',
            });
        } catch (err) {
            console.log('ee', err);
            setStatus({ state: 'error' });
        }

        setChecking(false);

    };

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
                <StyledStatusText horizontal={options.metaMenu}>Publish content</StyledStatusText>
                <Button leftMargin={options.metaMenu} loading={publishing()} onClick={ (e) => publish(e) } disabled={status.live?.synced}>
                    { status.live?.synced ? 'Published to live site' : 'Publish to live site' }
                </Button>
                <Button leftMargin={options.metaMenu} loading={unpublishing()} onClick={ (e) => unpublish(e) } disabled={!status.live?.synced}>
                    { status.live && status.live.synced ? 'Unpublish from live site' : 'Content not published' }
                </Button>
                <Show when={options.enableTestContent}>
                    <Button leftMargin={options.metaMenu} loading={unpublishing()} onClick={ (e) => unpublish(e) } disabled={!status.test?.synced}>
                        { status.test && status.test.synced ? 'Unpublish from test target' : 'Publish to test target' }
                    </Button>
                </Show>
                <Show when={options.enableDiffButton}>
                    <Button leftMargin={options.metaMenu}>Show diff (raw)</Button>
                </Show>
            </Show>
        </StyledContainer>
    );

};

export default MetaBox;
