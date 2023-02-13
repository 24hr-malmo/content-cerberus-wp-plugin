import { styled } from 'solid-styled-components';

const StyledType = styled('div')`
    text-transform: uppercase;
    font-size: 13px;
    margin-right: 0.5rem;
    background-color: rgba(0,0,0,0.1);
    padding: 0.2rem 0.35rem;
    min-width: 50px;
    display: flex;
    justify-content: center;
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

const StyledPublicationRequestItem = styled('div')`
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
    font-size: 15px;
`; 

const PublicationRequestItem = (props) => {

    const formatDateAndTime = () => {
        const date = new Date(props.item.updated_on);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formattedDate = year + "-" + month + "-" + day + ", " + hours + ":" + minutes;
        return formattedDate;
    }

    return (
        <StyledPublicationRequestItem key={props.item.post_id}>
            <StyledType>{props.item.type}</StyledType>
            <StyledText>
                 <StyledTitle href={props.item.editorUrl} target="_blank">{props.item.post_title}</StyledTitle>, requested by <em>{props.item.from_user_name}</em> ({formatDateAndTime()})
            </StyledText>
        </StyledPublicationRequestItem>    
    )
}

export default PublicationRequestItem;