import { Show } from "solid-js";
import { contentStatus, updatePublicationApproval, withdrawPublicationRequest } from './publication-approval-store.jsx';
import Button from '../../components/button/button.jsx';

const PublishingControls = () => {

    const publishButton = () => {
        return (
            <Button
                leftMargin={contentStatus.options.metaMenu}
                loading={contentStatus.publishing}
                onClick={(e) => contentStatus.publish(e)}
                disabled={contentStatus.changesNotSavedToDraft}
            >
                { contentStatus.changesNotSavedToDraft 
                    ? 'Save draft before publishing to live' 
                    : 'Publish to live site'
                }
            </Button>
        );
    }

    return (
        <>
            <Show when={contentStatus.approvalStatus === ''}>
                <Show when={contentStatus.options.userHasPublicationRights}>
                    {publishButton()}
                </Show>
                <Show when={!contentStatus.options.userHasPublicationRights}>
                    <Button 
                        leftMargin={contentStatus.options.metaMenu}
                        onClick={ (e) => updatePublicationApproval('pending')}
                        disabled={contentStatus.changesNotSavedToDraft}
                    >
                        { contentStatus.changesNotSavedToDraft 
                            ? 'Save draft before publish request'
                            : 'Request approval to publish'
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
                    {publishButton()}
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
                    {publishButton()}
                </Show>
                <Show when={!contentStatus.options.userHasPublicationRights}>
                    <Button 
                        leftMargin={contentStatus.options.metaMenu}
                        loading={contentStatus.publishing}
                        onClick={ (e) => contentStatus.publish(e)}
                        disabled={ contentStatus.changesNotSavedToDraft}
                    >
                        { contentStatus.changesNotSavedToDraft 
                            ? 'Discard unapproved changes to publish'
                            : 'Publish to live site'
                        }
                    </Button>
                </Show>
            </Show>
        </>
    );
};

export default PublishingControls;