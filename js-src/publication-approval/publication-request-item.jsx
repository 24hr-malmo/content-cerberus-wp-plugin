import { styled } from 'solid-styled-components';
import Button from '../components/button/button.jsx';

const StyledType = styled('div')`
    text-transform: uppercase;
    font-size: 13px;
    margin-right: 0.5rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.35rem;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-self: flex-start;
`;

const StyledTitle = styled('a')`
    ${p => !p.href ? 'color: black;' : ''}
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: none;
`;

export const StyledText = styled('p')`
    margin: 0;
    font-size: inherit;
    color: gray;
`;

const StyledRejectionHeading = styled('h5')`
    margin: 0;
    margin-bottom: 0.3rem;
    text-decoration: underline;
`;

const StyledPublicationRequestItem = styled('div')`
    margin-top: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    font-size: 15px;
`; 

const StyledWrappedButton = styled('div')`
    display: flex;
    align-items: flex-start;
    margin-top: -10px;
    padding-inline: 1rem;
`;

const StyledRejectionPanel = styled('div')`
    padding-left: 1rem;
    margin-top: 0.5rem;
`;

const PublicationRequestItem = (props) => {

    const formatDateAndTime = () => {
        const date = new Date(props.item.content.updated_on);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formattedDate = year + "-" + month + "-" + day + ", " + hours + ":" + minutes;
        return formattedDate;
    }

    const logData = () => {
        console.log('Request data: ', props.item);
    };


    const getItemLink = () => {
        // If the domain has been obfuscated (e.g. on prod) we have to add it to the editorUrl
        const domain = props.item.content['wp-domain'];
        const itemLink = props.item.content.editorUrl.includes(domain)
            ? props.item.content.editorUrl
            : `${props.item.content['wp-domain']}${props.item.content.editorUrl}`;

        return itemLink;
    }

    return (
        <StyledPublicationRequestItem key={props.item.content.post_id}>
            <StyledType onClick={logData}>{props.item.content.type}</StyledType>
            <StyledText>

                 <StyledTitle 
                    href={getItemLink()}
                    target="_blank"
                >
                    {props.item.content.post_title}
                </StyledTitle>

                <Show when={props.type === 'admin'}>
                    <span>, requested by <em>{props.item.content.requestedBy}</em></span>                
                </Show>

                <Show when={props.item.content.status === 'rejected'}>
                    <span> - rejected by <em>{props.item.content.rejectedBy}</em></span>
                </Show>

                <Show when={props.item.content.status === 'approved' || props.item.content.status === 'approvedAndPublished'}>
                    <span> - approved by <em>{props.item.content.approvedBy}</em></span>
                </Show>

                {` (${formatDateAndTime()})`}

                 <Show when={props.item.content.status === 'rejected'}>
                     <StyledRejectionPanel>
                        <StyledRejectionHeading>Rejection message:</StyledRejectionHeading>
                        <em>{props.item.content.rejectionReason}</em>
                     </StyledRejectionPanel>
                 </Show>
            </StyledText>
            <StyledWrappedButton>
                <Button onClick={props.manualDelete}>Delete</Button>
            </StyledWrappedButton>
        </StyledPublicationRequestItem>    
    )
}

export default PublicationRequestItem;
