import { render } from 'solid-js/web';

import hooks from './hooks';
import { AppProvider } from './cerberus-pages/context/app-context.jsx';
import App from './cerberus-pages/app/app.jsx';
import MetaBox from './meta-box/meta-box.jsx';
import DomainSettings from './domain-settings/domain-settings.jsx';

const getData = (id) => {
    try {
        return JSON.parse(document.getElementById(id).innerHTML); // eslint-disable-line
    } catch (err) {
        return {};
    }
};


const renderMetaBox = () => {
    const root = document.getElementById('dls-metabox-root');
    if (root) {
        const data = getData('dls-data');
        render(() => (<MetaBox options={data}/>), root);
    }
};

const renderAdmin = () => {
    const data = getData('dls-data');
    render(() => (<AppProvider values={data}><App/></AppProvider>), document.getElementById('dls-root'));
};

const renderDomainSettings = () => {
    const root = document.getElementById('dls-domain-settings-root');
    const data = getData('dls-data');
    console.log(data);
    render(() => (<DomainSettings options={data}/>), root);
};

jQuery(document).ready(function ($) {

    // Turn off the pre publish dialog
    if (wp && wp.data && wp.data.dispatch) {
        wp.data.dispatch('core/editor').disablePublishSidebar();
    }

    hooks();

    let hookData = {};
    try {
        hookData = $('#dls-hooks').length > 0 ? JSON.parse($('#dls-hooks').html()) : { hook: ''} ;
    } catch (err) { };

    console.log('Current hook', hookData && hookData.hook);

    if (hookData.hook === 'post.php') {
        renderMetaBox();
    } else if (hookData.hook === 'nav-menus.php') {
        renderMetaBox();
    } else if (hookData.hook.includes('toplevel_page_draft-live-sync')) {
        renderAdmin();
    } else if (hookData.hook.includes('toplevel_page_cerberus-domain-settings')) {
        renderDomainSettings();
    } else if (!hookData.hook.includes('.php')) {
        renderMetaBox();
    }

});
