import { contentStatus, updatePublicationApproval, beginRejection, toggleRejectionControls, setRejectionReason } from './store.jsx';
import Button from '../../components/button/button.jsx';
import PublishButton from './publish-button.jsx';

const AdminControls = () => {

    return (
        <>
            <Button
                leftMargin={contentStatus.options.metaMenu}
                onClick={(e) => updatePublicationApproval('approved')}
                disabled={contentStatus.showRejectionControls}
            >
                Approve
            </Button>

            <Show when={!contentStatus.showRejectionControls}>
                <Button
                    leftMargin={contentStatus.options.metaMenu}
                    onClick={(e) => beginRejection()}
                    disabled={contentStatus.showRejectionControls}
                >
                    Reject
                </Button>
            </Show>

            <Show when={contentStatus.showRejectionControls}>
                <div style={{ 'margin-block': '1.5rem' }}>
                    <h4 style={{ 'margin-bottom': 0 }}>Rejection reason</h4>
                    <textarea
                        rows={4}
                        placeholder='Message to the editor'
                        maxLength={200}
                        style={{ width: '100%', 'margin-top': '0.5rem' }}
                        onChange={(e) => {
                            setRejectionReason(e.target.value);
                        }}
                    />
                    <div style={{ display: 'flex' }}>
                        <Button
                            leftMargin={contentStatus.options.metaMenu}
                            onClick={(e) => toggleRejectionControls()}
                            disabled={false}
                            style={{ 'margin-top': 0, 'margin-right': '0.2rem' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            leftMargin={contentStatus.options.metaMenu}
                            onClick={(e) => updatePublicationApproval('rejected')}
                            disabled={false}
                            style={{ 'margin-top': 0 }}
                        >
                            Send rejection
                        </Button>
                    </div>
                </div>
            </Show>

            <Show when={!contentStatus.showRejectionControls}>
                <PublishButton />
            </Show>
        </>
    );
}

export default AdminControls;