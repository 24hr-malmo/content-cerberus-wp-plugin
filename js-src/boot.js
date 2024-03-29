import { render } from 'solid-js/web';

import hooks from './hooks';
import { AppProvider } from './cerberus-pages/context/app-context.jsx';
import App from './cerberus-pages/app/app.jsx';
import MetaBox from './meta-box/meta-box.jsx';
import DomainSettings from './domain-settings/domain-settings.jsx';
import PublicationApprovalDashboard from './publication-approval/publication-approval-dashboard.jsx';
import PublicationRequestsDashboard from './publication-approval/publication-requests-dashboard.jsx';

const getData = (id) => {
    try {
        return JSON.parse(document.getElementById(id).innerHTML); // eslint-disable-line
    } catch (err) {
        console.log('Error in getData', err);
        return {};
    }
};


const renderMetaBox = () => {
    let root = document.getElementById('dls-metabox-root');
    if (root) {
        const data = getData('dls-data');
        data.metaMenu = root.getAttribute('data-type') === 'nav-menu';
        if (data.metaMenu) {
            root = document.createElement('div');
            root && document.querySelector('#nav-menu-footer').prepend(root);
        }
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
    render(() => (<DomainSettings options={data}/>), root);
};

const renderPublicationApprovalDashboard = () => {
    const root = document.getElementById('dls-publication-approval-root');
    const data = getData('dls-data');
    render(() => (<PublicationApprovalDashboard options={data}/>), root);
};

const renderPublicationRequests = () => {
    const root = document.getElementById('dls-publication-requests-root');
    const data = getData('dls-data');
    render(() => (<PublicationRequestsDashboard options={data}/>), root);
};

jQuery(document).ready(function ($) {

    // Turn off the pre publish dialog of pages using the Gutenberg editor
    const editor = wp?.data?.dispatch('core/editor');
    if (editor) {
        editor.disablePublishSidebar();
    }

    hooks();

    let hookData = {};
    try {
        hookData = $('#dls-hooks').length > 0 ? JSON.parse($('#dls-hooks').html()) : { hook: ''} ;
    } catch (err) { };

    console.log('Current hook', hookData && hookData.hook);

    if ( hookData.hook === 'post.php'|| hookData.hook === 'post-new.php') {
        renderMetaBox();
    } else if (hookData.hook === 'nav-menus.php') {
        renderMetaBox();
    } else if (hookData.hook.includes('toplevel_page_draft-live-sync')) {
        renderAdmin();
    } else if (hookData.hook.includes('toplevel_page_cerberus-domain-settings')) {
        renderDomainSettings();
    } else if (hookData.hook.includes('toplevel_page_publication-approval')) {
        renderPublicationApprovalDashboard();
    } else if (hookData.hook.includes('toplevel_page_publication-requests')) {
        renderPublicationRequests();
    } else if (!hookData.hook.includes('.php')) {
        renderMetaBox();
    }


    // This make sure we can activate cerberus with a secret click

    const toggleCerberus = () => {
        const showCerberus = getCookie('cerberus-activated') === 'true';
        const cerberus = document.querySelector('#toplevel_page_draft-live-sync');
        if (showCerberus && cerberus) {
            cerberus.style.display = 'block';
        } else if (cerberus) {
            cerberus.style.display = 'none';
        }
    }
    toggleCerberus();

    const initiator = document.querySelector('#cerberus-initiator');
    if (initiator) {
        let counter = 0;
        initiator.addEventListener('click', () => {
            if (counter++ > 9) {
                const showCerberus = getCookie('cerberus-activated') === 'true';
                if (!showCerberus) {
                    setCookie('cerberus-activated', true, 1000);
                } else {
                    setCookie('cerberus-activated', false, 0);
                }
                toggleCerberus();
                counter = 0;
            }
        });
    }

});

const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};

const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


