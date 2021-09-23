import { styled } from 'solid-styled-components';

export const StyledItem = styled('div')`
    display: flex;
    margin-bottom: 2px;
`;

export const StyledType = styled('div')`
    background-color: #ddd;
    font-size: 10px;
    color: #999;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    width: 70px;
    text-align: center;
    cursor: pointer;
`;

export const StyledButton = styled('div')`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
`;

export const StyledPermalink = styled('a')`
    display: block;
    color: grey;
    text-decoration: none;
`;

export const StyledDot = styled('div')`
    padding: 0 5px 0 0;
    svg {
        fill: ${p => p.color };
        transition: fill .2s ease-in;
    }
`;
