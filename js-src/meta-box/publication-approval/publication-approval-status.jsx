import { Switch, Match } from "solid-js";
import { StyledStatusText } from '../meta-box.style.jsx';
import { contentStatus } from './publication-approval-store.jsx';

const PublicationApprovalStatus = () => {
    return (
        <Switch>
            <Match when={contentStatus.approvalStatus === 'pending'}>
                <StyledStatusText horizontal={contentStatus.options.metaMenu}>Pending approval</StyledStatusText>
            </Match>
            <Match when={contentStatus.approvalStatus === 'approved'}>
                <StyledStatusText horizontal={contentStatus.options.metaMenu}>Publication approved {contentStatus.approvedBy}</StyledStatusText>
            </Match>
            <Match when={contentStatus.approvalStatus === 'rejected'}>
                <StyledStatusText horizontal={contentStatus.options.metaMenu}>Publication rejected</StyledStatusText>
            </Match>
        </Switch>
    );
};

export default PublicationApprovalStatus;