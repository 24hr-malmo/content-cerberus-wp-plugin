import { Show } from "solid-js";
import { contentStatus, updatePublicationApproval, withdrawPublicationRequest } from './publication-approval-store.jsx';
import Button from '../../components/button/button.jsx';

const PublishingUpdateControls = () => {

    return (
        <>
            <Show when={contentStatus.approvalStatus === ''}>
                <Show when={contentStatus.options.userHasPublicationRights}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu} 
                        loading={contentStatus.publishing} 
                        onClick={ (e) => contentStatus.publish(e) }
                        disabled={contentStatus.syncStatus.live?.synced || contentStatus.changesNotSavedToDraft}
                    >
                        { contentStatus.changesNotSavedToDraft ? 
                            'Save draft before updating on live' 
                            : contentStatus.syncStatus.live?.synced ? 'Updated on live site' : 'Update on live site'
                        }
                    </Button>
                </Show>
                <Show when={!contentStatus.options.userHasPublicationRights}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        loading={contentStatus.publishing}
                        onClick={ (e) => updatePublicationApproval('pending') }
                        disabled={contentStatus.syncStatus.live?.synced || contentStatus.changesNotSavedToDraft}
                    >
                        { contentStatus.changesNotSavedToDraft ? 
                            'Save draft before requesting publication approval' 
                            : contentStatus.syncStatus.live?.synced ? 'Updated on live site' : 'Request approval to publish'
                        }
                    </Button>
                </Show>
            </Show>

            <Show when={contentStatus.approvalStatus === 'pending'}>
                <Show when={contentStatus.options.userHasPublicationRights}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        onClick={ (e) => updatePublicationApproval('approved')}
                        disabled={false}
                    >
                        Approve 
                    </Button>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        onClick={ (e) => updatePublicationApproval('rejected') }
                        disabled={false}
                    >
                        Reject
                    </Button>
                    <Button
                        leftMargin={contentStatus.options.metaMenu} 
                        loading={contentStatus.publishing}
                        onClick={ (e) => contentStatus.publish(e)}
                        disabled={ contentStatus.changesNotSavedToDraft}
                    >
                        { contentStatus.changesNotSavedToDraft ? 
                            'Save draft before updating on live' 
                            : contentStatus.syncStatus.live?.synced ? 'Updated on live site' : 'Update on live site'
                        }
                    </Button>
                </Show>
                <Show when={!contentStatus.options.userHasPublicationRights}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        onClick={ (e) => withdrawPublicationRequest()}
                        disabled={false}
                    >
                        Withdraw publication request
                    </Button>
                </Show>
            </Show>

            <Show when={contentStatus.approvalStatus === 'approved'}>
                <Show when={contentStatus.options.userHasPublicationRights}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        loading={contentStatus.publishing}
                        onClick={ (e) => contentStatus.publish(e)}
                        disabled={contentStatus.syncStatus.live?.synced || contentStatus.changesNotSavedToDraft}
                    >
                        { contentStatus.changesNotSavedToDraft ?
                            'Save draft before publishing to live'
                            : contentStatus.syncStatus.live?.synced ? 'Updated on live site' : 'Update on live site'
                        }
                    </Button>
                </Show>
                <Show when={!contentStatus.options.userHasPublicationRights}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        loading={contentStatus.publishing}
                        onClick={ (e) => contentStatus.publish(e)}
                        disabled={contentStatus.syncStatus.live?.synced || contentStatus.changesNotSavedToDraft}
                    >
                        { contentStatus.changesNotSavedToDraft ?
                            'Save to draft or discard unapproved changes to publish'
                            : contentStatus.syncStatus.live?.synced ? 'Updated on live site' : 'Update on live site'
                        }
                    </Button>
                </Show>
            </Show>

            <Show when={contentStatus.approvalStatus === 'rejected'}>
                <Show when={!contentStatus.options.userHasPublicationRights}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        onClick={(e) => null}
                        disabled={true}
                    >
                    { contentStatus.changesNotSavedToDraft ?
                        'Save draft before requesting publication approval' 
                        : 'Make changes before requesting approval to publish'
                    }
                    </Button>
                </Show>
            </Show>
        </>
    );
};

export default PublishingUpdateControls;