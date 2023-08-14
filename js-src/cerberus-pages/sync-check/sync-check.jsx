import { createStore } from 'solid-js/store';
import { useContext, For, createEffect, createSignal } from 'solid-js';

import { wpAjaxAction, wpAjax } from '../../utilities/wp-action.js';
import { AppContext } from '../context/app-context.jsx';

import Page from '../../components/page/page.jsx';
import PageTop from '../../components/page-top/page-top.jsx';
import Button from '../../components/button/button.jsx';
import Item from '../../components/item/item.jsx';

const SyncCheck = () => {

    const [ _, { apiUrl } ] = useContext(AppContext);
    const [ items, setItems ] = createStore({ list: [] });
    const [ checking, setChecking ] = createSignal(false);

    console.log(apiUrl);

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
            const result = await wpAjax(`${apiUrl}/check-sync.php`, {
                permalink: item.permalink
            });
            setItems('list', item.index, 'status', {
                draft: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'draft' && itemStatus.comparedTo === '__original'),
                live: result.data.resourceStatus.find(itemStatus => itemStatus.target === 'live' && itemStatus.comparedTo === 'draft'),
                state: 'loaded',
            } );
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

    const getAllTargetsContent = async (permalink) => {
        const result = await wpAjax(`${apiUrl}/get-all-targets-content.php`, {
            permalink: permalink
        });

        return result;
    }

    return (
        <Page>
            <PageTop
                title="Sync Check"
                description="This is where you can check if all content is in sync"
                actions={ (<Button loading={checking()} onClick={() => doAll() }>Begin to check</Button>) }
            />
            <For each={items.list}>
                { (item) =>  {
                    return (<Item
                        showDraft={true}
                        showLive={true}
                        showCheckButton={true}
                        item={item}
                        getAllTargetsContent={() => getAllTargetsContent(item.permalink)}
                        permalink={item.permalink}
                        onClick={() => syncItem(item) }
                        onTypeClick={() => syncByType(item.type) }
                    />);
                } }
            </For>
        </Page>
    );

};

export default SyncCheck;


