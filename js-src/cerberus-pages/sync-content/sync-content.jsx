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
    const [ filteredItems, setFilteredItems ] = createStore({ list: [] });
    const [ checking, setChecking ] = createSignal(false);
    const [ createTreeChecking, setCreateTreeChecking ] = createSignal(false);

    createEffect(async () => {
        const result = await wpAjaxAction('get_all_resources');
        const parsed = result.list.map((item, index) => {
            return {
                ...item,
                index,
            };
        });
        setItems({list: parsed});
        setFilteredItems({list: parsed});
    });


    const recreateTree = async () => {
        try {
            setCreateTreeChecking(true);

            const result = await wpAjax(`${apiUrl}/recreate-tree.php`, {
                action: 'recreate_tree',
                release: type,
            });

            setCreateTreeChecking(false);
            window && console.log(result);
            window && window.alert('Recreating tree done - check console.log for response');
        } catch (err) {
            window && window.alert('Error recreating tree - check console.log');
        }
    };

    const sync = async (item, { syncTreeAndCache = true }) => {

        try {
            const result = await wpAjax(`${apiUrl}/sync.php`, {
                action: 'sync',
                permalink: item.permalink,
                release: type,
                sync_check: false,
                sync_tree: syncTreeAndCache,
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

    const syncItem = async (item, config) => {
        setChecking(true);
        await sync(item, config);
        setChecking(false);
    }

    const doAll = async (config) => {

        if (checking()) {
            return;
        }

        let ok = false;
        if (type === 'live' && confirm('Do you really want to publish the list?')) {
            ok = true;
        } else if (type === 'draft') {
            ok = true;
        }

        if (ok) {
            setChecking(true);
            filteredItems.list.forEach((_, index) => {
                setFilteredItems('list', index, 'status', {
                    state: '',
                } );
                index++;
            });
            for await (let item of items.list) {
                await sync(item, config);
            }
            setChecking(false);
        }

    };

    const syncByType = async (type, config) => {
        setChecking(true);
        const filtered = filteredItems.list.filter(item => item.type === type);
        filtered.forEach((_, index) => {
            setFilteredItems('list', index, 'status', {
                state: '',
            } );
            index++;
        });
        for await (let item of filtered) {
            await sync(item, config);
        }
        setChecking(false);
    };

    const filterItems = (query) => {
        if (query === '') {
            setFilteredItems({ list: items.list });
            return;
        }

        const filtered = items.list.filter(item => {
            return item.permalink.startsWith(query);
        });

        setFilteredItems({ list: filtered });
    };

    const handleFilterItems = (event) => {
        filterItems(event.target.value);
    };

    const buttonText = type === 'draft' ? 'Begin to sync to Draft' : 'Publish list to Live';
    const title = type === 'draft' ? 'Sync Draft' : 'Sync Live';
    const description = type === 'draft' ?
        'This is where you can make sure that wordpress and the draft content is in sync' :
        'This is where you can make sure that Draft and Live are in sync' ;

    return (
        <Page>
            <PageTop
                title={title}
                description={description}
                actions={ (
                    <div>
                        <Button loading={checking()} onClick={() => doAll({ syncTreeAndCache: false }) }>{ buttonText }</Button>
                        <Button loading={createTreeChecking()} onClick={() => recreateTree() }>{ "Recreate tree, required after type/all syncs" }</Button>
                    </div>
                    ) }
            />
            <div style="padding-bottom:10px;">
                <label for="filter">Filter</label>
                <input type="text" name="filter" onInput={handleFilterItems} />
            </div>
            <For each={filteredItems.list}>
                { (item) =>  {
                    return (<Item
                        showDraft={ type === 'draft' }
                        showLive={ type === 'live' }
                        showSyncButton={ true }
                        onClick={() => syncItem(item, { syncTreeAndCache: true })}
                        onTypeClick={() => syncByType(item.type, { syncTreeAndCache: false })}
                        item={item}
                        permalink={item.permalink}
                    />);
                } }
            </For>
        </Page>
    );
};

export default SyncContent;