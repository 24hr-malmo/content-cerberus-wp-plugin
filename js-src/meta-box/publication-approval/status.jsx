import { Switch, Match } from "solid-js";
import { styled } from 'solid-styled-components';
import { StyledStatusText } from '../meta-box.style.jsx';
import { contentStatus } from './store.jsx';

const StyledRejectionMessage = styled('div')`
    padding: 0.25rem;
    background: #fefbe6;
`;

const ApprovalStatus = () => {

    return (
        <Switch>
            <Match when={contentStatus.approvalStatus === 'pending'}>
                <StyledStatusText horizontal={contentStatus.options.metaMenu}>Pending approval</StyledStatusText>
            </Match>
            <Match when={contentStatus.approvalStatus === 'approved'}>
                <StyledStatusText horizontal={contentStatus.options.metaMenu}>Publication approved {contentStatus.approvedBy ? ' by ' + contentStatus.approvedBy : ''}</StyledStatusText>
            </Match>
            <Match when={contentStatus.approvalStatus === 'rejected'}>
                <StyledStatusText horizontal={contentStatus.options.metaMenu}>Publication rejected {contentStatus.rejectedBy ? ' by ' + contentStatus.rejectedBy : ''}</StyledStatusText>
                <Show when={contentStatus.rejectionReason}>
                    <StyledRejectionMessage>
                        <em>{contentStatus.rejectionReason}</em>
                    </StyledRejectionMessage>
                </Show>
            </Match>
        </Switch>
    );
};

export default ApprovalStatus;