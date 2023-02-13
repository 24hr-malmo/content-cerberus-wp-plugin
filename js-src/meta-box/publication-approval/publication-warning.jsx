import { Show } from "solid-js";
import { contentStatus } from './publication-approval-store.jsx';
import { StyledWarning } from '../meta-box.style.jsx';

const PublicationWarning = () => {

    return (
        <Show when={contentStatus.approvalStatus === 'pending' && contentStatus.changesNotSavedToDraft}>
            <StyledWarning>
                Saving a new draft will automatically withdraw the pending publication approval
            </StyledWarning>
        </Show>
    )
};

export default PublicationWarning;