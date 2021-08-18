import { styled } from 'solid-styled-components';

export const xStyledSvg = styled('svg')`
    margin: auto; 
    background: white;
    display: block; 
    shape-rendering: auto;
    width: ${p => p.width};
    height: ${p => p.height};
`;

export const StyledSvg = styled('svg')`
    margin: auto; 
    background: rgb(255, 255, 255); 
    display: block; 
    shape-rendering: auto;
`;



