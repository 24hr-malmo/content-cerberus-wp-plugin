import { createStore } from 'solid-js/store';
import { useContext, For, createEffect, createSignal } from 'solid-js';

import { wpAjaxAction, wpAjax } from '../../utilities/wp-action.js';
import { AppContext } from '../context/app-context.jsx';

import Page from '../../components/page/page.jsx';
import PageTop from '../../components/page-top/page-top.jsx';
import Button from '../../components/button/button.jsx';
import Item from '../../components/item/item.jsx';

const Overview = () => {

    const [resources, setResources] = createSignal([]);

    // 1. Get all resources for all language by type from a dropdown
    // 2. For pages: Build a slim and easy to overview tree structure by using the parent_id field for the page

    createEffect(async () => {
        const result = await wpAjaxAction('get_resources_from_content', { target: 'draft', type: 'page' });

        const result2 = await wpAjaxAction('get_all_wpml_resources');
        console.log('result2: ', result2);

        // For each key in result2 object
        const allResources = Object.entries(result2).reduce((acc = [], [key, value]) => {
            return [...acc, ...value];
        }, []);
        // console.log('allResources: ', allResources);
        // reduce((acc, {key, value}) => {
        //     // For each value in the array
        // }, []);
        console.log('allResources: ', allResources);


        console.log('result.data.resources: ', result.data.resources);
        setResources(result.data.resources);
    });

    return (
        <Page>
            <PageTop
                title="Overview"
                description="This is for a good overview of the sites pages, and a possibility to remove pages."
                // actions={ (<Button loading={checking()} onClick={() => doAll() }>Begin to check</Button>) }
            />
            <ul>
                <For each={resources()}>
                    {({ externalId, key }) => (
                        <li>{key}<br/>{externalId}</li>
                    )}
                </For>
            </ul>
        </Page>
    );

};

export default Overview;


