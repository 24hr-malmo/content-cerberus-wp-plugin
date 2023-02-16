import { Show } from "solid-js";
import { contentStatus, updatePublicationApproval, withdrawPublicationRequest } from './publication-approval-store.jsx';
import Button from '../../components/button/button.jsx';
import PublishButton from './publish-button.jsx';
import AdminPublicationControls from './admin-publication-controls.jsx';

const debugging = false;

const DebugPanel = () => {
    return (
        <div style={{background: 'lightgray', padding: '0.5rem'}}>
            <h5>
                Dev mode
            </h5>
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
                onClick={ (e) => updatePublicationApproval('pending')}
                disabled={contentStatus.changesNotSavedToDraft}
            >
                Set to pending
            </Button>
        </div>
    )
}

const PublishingControls = () => {
    return (
        <>
            <Show when={contentStatus.approvalStatus === ''}>
                <Show when={contentStatus.options.userHasPublicationRights}>
                    <PublishButton />
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

            <Show when={debugging}>
                <DebugPanel />
            </Show>

            <Show when={contentStatus.approvalStatus === 'pending'}>
                <Show when={contentStatus.options.userHasPublicationRights}>
                    <AdminPublicationControls />
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
                    <PublishButton />
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

            <Show when={contentStatus.approvalStatus === 'rejected'}>
                <Show when={contentStatus.options.userHasPublicationRights}>
                    <PublishButton />
                </Show>
            </Show>
        </>
    );
};

export default PublishingControls;