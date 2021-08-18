import { styled } from 'solid-styled-components';


// Ugly as hell imporant but wordpress forces their css on us.
export const StyledSelect = styled('select')`
    max-width: 100% !important;
`;

export const StyledInputBox = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`;

export const StyledInputLabel = styled('label')`
    padding: 5px 5px 0px 5px;
    font-size: 10px;
    height: 18px;
`;



