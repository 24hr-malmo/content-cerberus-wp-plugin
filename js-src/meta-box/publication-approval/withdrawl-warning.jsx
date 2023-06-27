import { Show } from "solid-js";
import { contentStatus } from './store.jsx';
import { StyledWarning } from '../meta-box.style.jsx';

const WithdrawlWarning = () => {

    return (
        <Show when={contentStatus.approvalStatus === 'pending' && contentStatus.changesNotSavedToDraft}>
            <StyledWarning>
                Saving a new draft will automatically withdraw the pending publication approval
            </StyledWarning>
        </Show>
    )
};

export default WithdrawlWarning;