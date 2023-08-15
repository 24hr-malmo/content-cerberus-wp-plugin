import { createStore } from 'solid-js/store';
import { wpAjax } from '../../utilities/wp-action.js';
// import { sendEmail } from '../../utilities/send-mail.js';

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
    console.log('Getting publication request for:', contentStatus.options.permalink);
    
    try {
        const result = await wpAjax(`${contentStatus.options.api}/get-publication-request.php`, {
            postId: contentStatus.options.postId
        });

        if (result.data.resource?.content) {
            const content = result.data.resource.content;

            setContentStatus({
                approvalStatus: content.status, 
                approvedBy: content.approvedBy,
                rejectedBy: content.rejectedBy,
                rejectionReason: content.rejectionReason || '',
                requestedBy: content.requestedBy,
                editorEmail: content.from_user_email,
                postTitle: content.post_title,
                siteTitle: content.from_site_name,
            });

            console.log('Publication request: ', contentStatus);
            
        } else {
            console.log('No publication request found for:', contentStatus.options.permalink);
            setApprovalStatus('');
        }
    } catch (err) {
        console.log('Error fetching publication request', err)
    }
};

export const upsertPublicationRequest = async (status) => {
    console.log('Creating/updating pub request for ' + contentStatus.options.permalink + ': ', contentStatus);
    
    try {
        await wpAjax(`${contentStatus.options.api}/upsert-publication-request.php`, {
            permalink: contentStatus.options.permalink,
            status: status,
            editorUrl: window?.location.href,
            approvedBy: status === 'approved' ? contentStatus.options.userName : '',
            rejectedBy: status === 'rejected' ? contentStatus.options.userName : '',
            requestedBy: status === 'pending' ? contentStatus.options.userName : contentStatus.requestedBy,
            rejectionReason: contentStatus.rejectionReason,
        });

        return {};
    } catch (err) {
        console.log('Error upserting publication request', err);
        return {err};
    }
};

const deletePublicationRequest = async () => {
    console.log('Deleting pub request for ' + contentStatus.options.permalink + ': ', contentStatus);
    
    try {
        const result = await wpAjax(`${contentStatus.options.api}/delete-publication-request.php`, {
            postId: contentStatus.options.postId
        });

        if (!result?.data?.deleteResource?.success) {
            console.log('Unable to delete publication request because: ', result?.errors?.[0]?.message);
        }

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
        setContentStatus({ errorMessage: 'Error changing status to ' + status });
        console.log('Err upserting request', result.err);
    } else {
        setApprovalStatus(status);
    }

    contentStatus.setChecking(false);

    if (status === 'approved' || status === 'rejected') {
        notifyEditor();
    }
}

const notifyEditor = async () => {
    const { postTitle, rejectionReason, approvalStatus, editorEmail } = contentStatus;
    const { userName: admin, siteTitle } = contentStatus.options;

    try {
        await wpAjax(`${contentStatus.options.api}/send-publication-approval-email.php`, {
            data: {
                useCustomMailSystem: contentStatus.options.useCustomSmtp,
                postTitle,
                rejectionReason,
                approvalStatus,
                admin,
                editorEmail,
                siteTitle,
                postUrl: window?.location.href,
            }
        });
    } catch (err) {
        console.log('Error sending email');
    }
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