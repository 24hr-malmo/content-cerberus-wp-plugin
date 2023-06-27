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
    
    try {
        const result = await wpAjax(`${contentStatus.options.api}/get-publication-request.php`, {
            permalink: contentStatus.options.permalink
        });

        if (result.data.resource?.content) {
            const content = result.data.resource.content;
            console.log('content.from_user_email', content.from_user_email);

            setContentStatus({
                approvalStatus: content.status, 
                approvedBy: content.approvedBy,
                rejectedBy: content.rejectedBy,
                rejectionReason: content.rejectionReason || '',
                requestedBy: content.requestedBy,
                userEmail: content.from_user_email,
                postTitle: content.post_title,
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
            requestedBy: contentStatus.options.userName,
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

    // if (status === 'approved' || status === 'rejected') {
    //     notifyEditor();
    // }
}

// const notifyEditor = async () => {
//     const admin = contentStatus.options.userName;    

//     const greeting = contentStatus.requestedBy ? `Hello ${contentStatus.requestedBy},\n\n` : `Hello,\n\n`;
//     const postLink = `View it here: ${window?.location.href}`;
//     const closer = `\n\nThis is an automated message. Please do not reply to this email.\n\n`;

//     const subject = {
//         approved: 'Approved publication',
//         rejected: 'Rejected publication',
//     }

//     let body = {
//         approved: `${greeting}Your post "${contentStatus.postTitle}" has been approved by ${admin}. \n\n${postLink}.${closer}`,
//         rejected: `${greeting}Your post "${contentStatus.postTitle}" has been rejected by ${admin}. \n\n${postLink}. \n\nReason: \n${contentStatus.rejectionReason}${closer}}`,
//     }

//     const mail = 'christofer.haglund@24hr.se';
//     const status = contentStatus.approvalStatus;
//     console.log('sending email', mail, subject[status], body[status]);

//     try {
//         const result = await wpAjax(`${contentStatus.options.api}/send-email.php`, {
//             to: mail,
//             subject: subject[status],
//             body: body[status],
//         });
    
//         console.log('result from sending email: ', result);
//     } catch (err) {
//         console.log('Error sending email', err);
//     }
// }

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