import { StyledType, StyledButton, StyledItem, StyledPermalink, StyledDot } from './item.style.jsx';

const Item = ({ showCheckButton, showSyncButton, showDraft, showLive, item, onClick, onTypeClick }) => {

    const getDot = (info, state) => {

        let color = '#bbbbbb';
        if (state === 'error') {
            color = '#da694b';
        } else if (state === '') {
            color = '#bbbbbb';
        } else {
             if (info) {
                if ( info.synced ) {
                    color = '#99da4b'
                } else {
                    color = '#e9da4e';
                }
            }
        }

        return color;
    };

    return (
        <StyledItem>
            <Show when={showDraft}><StyledDot color={ getDot(item.status?.draft, item.status?.state) }><svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0" /></svg></StyledDot></Show>
            <Show when={showLive}><StyledDot color={ getDot(item.status?.live, item.status?.state) }><svg height="10" width="10"><circle cx="5" cy="5" r="5" stroke-width="0" /></svg></StyledDot></Show>
            <Show when={showSyncButton}><StyledButton onClick={onClick}>sync</StyledButton></Show>
            <Show when={showCheckButton}><StyledButton onClick={onClick}>check</StyledButton></Show>
            <StyledType onClick={() => onTypeClick(item.type)}>{item.type}</StyledType>
            <StyledPermalink target="_new" href={ item.permalink }>{ item.permalink || '/' }</StyledPermalink>
        </StyledItem>
    );

};

export default Item;


