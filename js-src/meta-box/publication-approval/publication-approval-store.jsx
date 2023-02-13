import { createStore } from 'solid-js/store';
import { wpAjax } from '../../utilities/wp-action.js';

export const [contentStatus, setContentStatus] = createStore({
    options: {},
    setChecking: () => true,
    syncStatus: {},
    publish: () => null,
    changesNotSavedToDraft: false,
    approvalStatus: '',
    errorMessage: '',
    approvedBy: '',
})

export const setApprovalStatus = (status) => {    
    setContentStatus({ approvalStatus: status });
}

export const setErrorMessage = (msg) => {
    setContentStatus({ errorMessage: msg });
}

export const setApprovedBy = (name) => {
    setContentStatus({ approvedBy: name });
}

export const withdrawRequestOnNewDraft = () => {
    if (contentStatus.options.requireApproval && !contentStatus.options.userHasPublicationRights) {
        withdrawPublicationRequest();
    }
}

export const getPublicationRequest = async () => {
    try {
        const result = await wpAjax(`${contentStatus.options.api}/get-publication-request.php`, {
            permalink: contentStatus.options.permalink
        });

        if (result.data.resource?.content) {
            const content = result.data.resource.content;
            if (content.approvedBy) {
                setApprovedBy(' by ' + content.approvedBy);
            }
            
            setApprovalStatus(content.status);
        } else {
            setApprovalStatus('');
        }
    } catch (err) {
        console.log('Error fetching publication request', err)
    }
};


export const upsertPublicationRequest = async (status) => {    
    try {
        await wpAjax(`${contentStatus.options.api}/upsert-publication-request.php`, {
            permalink: contentStatus.options.permalink,
            status: status,
            editorUrl: window?.location.href,
            approvedBy: status === 'approved' ? contentStatus.options.userName : '',
        });

        return {};
    } catch (err) {
        console.log('Error upserting publication request', err);
        return {err};
    }
};

const deletePublicationRequest = async () => {
    try {
        await wpAjax(`${contentStatus.options.api}/delete-publication-request.php`, {
            permalink: contentStatus.options.permalink,
        });

        return {};
    } catch (err) {
        console.log('Error deleting request', err);
        return {err};
    }
};

export const updatePublicationApproval = async (status = '') => {
    contentStatus.setChecking(true);
    const result = await upsertPublicationRequest(status);

    if (result.err) {
        setErrorMessage('Error changing status to ' + status);
    } else {
        setApprovalStatus(status);
    }

    contentStatus.setChecking(false);
}

export const withdrawPublicationRequest = async () => {
    contentStatus.setChecking(true);
    const result = await deletePublicationRequest();

    if (result.err) {
        setErrorMessage('Something went wrong withdrawing publication request', result.err);
    } else {
        setApprovalStatus('');
    }

    contentStatus.setChecking(false);
}