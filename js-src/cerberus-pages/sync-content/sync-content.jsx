import { createStore } from 'solid-js/store';
import { useContext, For, createEffect, createSignal } from 'solid-js';

import { wpAjaxAction, wpAjax } from '../../utilities/wp-action.js';
import { AppContext } from '../context/app-context.jsx';

import Page from '../../components/page/page.jsx';
import PageTop from '../../components/page-top/page-top.jsx';
import Button from '../../components/button/button.jsx';
import Item from '../../components/item/item.jsx';

const SyncContent = ({type}) => {

    const [ _, { apiUrl } ] = useContext(AppContext);
    const [ items, setItems ] = createStore({ list: [] });
    const [ checking, setChecking ] = createSignal(false);

    createEffect(async () => {
        const result = await wpAjaxAction('get_all_resources');
        const parsed = result.list.map((item, index) => {
            return {
                ...item,
                index,
            };
        });
        setItems({list: parsed});
    });

    const sync = async (item) => {

        try {

            const result = await wpAjax(`${apiUrl}/sync.php`, {
                action: 'sync',
                permalink: item.permalink,
                release: type,
                sync_check: false,
            });

            if (result.data) {
                setItems('list', item.index, 'status', {
                    [type]: { synced: true },
                    state: 'loaded',
                } );
            } else {
                setItems('list', item.index, 'status', { state: 'error' });
            }

        } catch (err) {
            setItems('list', item.index, 'status', { state: 'error' });
        }

    };

    const syncItem = async (item) => {
        setChecking(true);
        await sync(item);
        setChecking(false);
    }

    const doAll = async () => {

        if (checking()) {
            return;
        }

        let ok = false;
        if (type === 'live' && confirm('Do you really which to publish everything?')) {
            ok = true;
        } else if (type === 'draft') {
            ok = true;
        }

        if (ok) {
            setChecking(true);
            items.list.forEach((_, index) => {
                setItems('list', index, 'status', {
                    state: '',
                } );
                index++;
            });
            for await (let item of items.list) {
                await sync(item);
            }
            setChecking(false);
        }

    };

    const syncByType = async (type) => {
        setChecking(true);
        const filtered = items.list.filter(item => item.type === type);
        filtered.forEach((_, index) => {
            setItems('list', index, 'status', {
                state: '',
            } );
            index++;
        });
        for await (let item of filtered) {
            await sync(item);
        }
        setChecking(false);
    };

    const buttonText = type === 'draft' ? 'Begin to sync to Draft' : 'Publish everything to Live';
    const title = type === 'draft' ? 'Sync Draft' : 'Sync Live';
    const description = type === 'draft' ?
        'This is where you can make sure that wordpress and the draft content is in sync' :
        'This is where you can make sure that Draft and Live are in sync' ;

    return (
        <Page>
            <PageTop
                title={title}
                description={description}
                actions={ (<Button loading={checking()} onClick={() => doAll() }>{ buttonText }</Button>) }
            />
            <For each={items.list}>
                { (item) =>  {
                    return (<Item
                        showDraft={ type === 'draft' }
                        showLive={ type === 'live' }
                        showSyncButton={ true }
                        onClick={() => syncItem(item)}
                        onTypeClick={() => syncByType(item.type)}
                        item={item}
                        permalink={item.permalink}
                    />);
                } }
            </For>
        </Page>
    );

};

export default SyncContent;


