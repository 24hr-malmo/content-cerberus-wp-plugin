import { Show } from "solid-js";
import { contentStatus, updatePublicationApproval, withdrawPublicationRequest } from './store.jsx';
import Button from '../../components/button/button.jsx';
import PublishButton from './publish-button.jsx';
import AdminControls from './admin-controls.jsx';

const debugging = false;

const DebugPanel = () => {
    return (
        <div style={{ background: 'lightgray', padding: '0.5rem', margin: '0.5rem' }}>
            <h5 style={{'text-align': 'center'}}>Debug Panel</h5>
            <Button
                leftMargin={contentStatus.options.metaMenu}
                onClick={(e) => updatePublicationApproval('approved')}
                disabled={false}
            >
                Approve
            </Button>
            <Button
                leftMargin={contentStatus.options.metaMenu}
                onClick={(e) => updatePublicationApproval('rejected')}
                disabled={false}
            >
                Reject
            </Button>
            <Button
                leftMargin={contentStatus.options.metaMenu}
                onClick={(e) => updatePublicationApproval('pending')}
                disabled={contentStatus.changesNotSavedToDraft}
            >
                Set to pending
            </Button>
        </div>
    );
}

const PublishingControls = ({ noContentFound }) => {
    if (noContentFound) {
        return null;
    }

    return (
        <>
            <Show when={debugging}>
                <DebugPanel />
            </Show>

            <Show when={contentStatus.options.userHasPublicationRights}>
                <Show
                    fallback={<PublishButton />}
                    when={contentStatus.approvalStatus === 'pending'}
                >
                    <AdminControls />
                </Show>
            </Show>

            <Show when={!contentStatus.options.userHasPublicationRights}>
                <Show
                    when={
                        contentStatus.approvalStatus === '' ||
                        contentStatus.approvalStatus === 'rejected' ||
                        contentStatus.approvalStatus === 'approvedAndPublished'
                    }
                >
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        loading={contentStatus.publishing}
                        onClick={(e) => updatePublicationApproval('pending')}
                        disabled={contentStatus.changesNotSavedToDraft || contentStatus.syncStatus.live?.synced}
                    >
                        {contentStatus.changesNotSavedToDraft 
                            ? 'Save draft before requesting publication approval' 
                            : contentStatus.syncStatus.live?.synced 
                                ? 'Updated on live site' 
                                : 'Request approval to publish'
                        }
                    </Button>
                </Show>

                <Show when={contentStatus.approvalStatus === 'pending'}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        onClick={(e) => withdrawPublicationRequest()}
                        disabled={false}
                    >
                        Withdraw publication request
                    </Button>
                </Show>

                <Show when={contentStatus.approvalStatus === 'approved'}>
                    <Button
                        leftMargin={contentStatus.options.metaMenu}
                        loading={contentStatus.publishing}
                        onClick={(e) => contentStatus.publish(e)}
                        disabled={contentStatus.changesNotSavedToDraft}
                    >
                        {contentStatus.changesNotSavedToDraft ? 'Discard unapproved changes to publish' : 'Publish to live site'}
                    </Button>
                </Show>
            </Show>
        </>
    );
};

export default PublishingControls;