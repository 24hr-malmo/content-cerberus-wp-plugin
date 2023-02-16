import { createStore } from 'solid-js/store';
import { wpAjax } from '../../utilities/wp-action.js';

export const [contentStatus, setContentStatus] = createStore({
    options: {},
    setChecking: () => true,
    syncStatus: {},
    publish: () => null,
    changesNotSavedToDraft: false,
    showRejectionControls: false,
    rejectionReason: '',

    approvalStatus: '',
    errorMessage: '',
    approvedBy: '',
})

export const setRejectionReason = (msg) => {
    setContentStatus({ rejectionReason: msg });
}

export const setApprovalStatus = (status) => {    
    setContentStatus({ approvalStatus: status });
}

export const toggleRejectionControls = () => {
    setContentStatus((state) => ({ showRejectionControls: !state.showRejectionControls }) );
}

export const withdrawRequestOnNewDraft = () => {
    if (contentStatus.options.requireApproval) {
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

            setContentStatus({
                approvalStatus: content.status, 
                approvedBy: content.approvedBy,
                rejectedBy: content.rejectedBy,
                rejectionReason: content.rejectionReason || '',
            });
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
            rejectedBy: status === 'rejected' ? contentStatus.options.userName : '',
            rejectionReason: contentStatus.rejectionReason,
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

export const updatePublicationApproval = async (status = '', options) => {
    contentStatus.setChecking(true);
    const result = await upsertPublicationRequest(status, options);

    if (result.err) {
        setContentStatus({ errorMessage: 'Error changing status to ' + status });
        console.log('Err upserting request', result.err);
    } else {
        setApprovalStatus(status);
    }

    contentStatus.setChecking(false);
}

export const withdrawPublicationRequest = async () => {
    contentStatus.setChecking(true);
    const result = await deletePublicationRequest();

    if (result.err) {
        setContentStatus({ errorMessage: 'Something went wrong withdrawing publication request' });
        console.log('Err deleting request', result.err);
    } else {
        setApprovalStatus('');
    }

    contentStatus.setChecking(false);
}

export const beginRejection = () => {
    toggleRejectionControls();
}