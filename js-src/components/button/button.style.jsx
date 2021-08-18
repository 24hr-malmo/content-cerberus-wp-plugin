import { styled } from 'solid-styled-components';

// Styled taken from wordpress
export const StyledButton = styled('button')`
    max-width: 300px;
    background-color: #006ba1;
    border-color: #006ba1;
    color: #fff;
    min-height: 32px;
    width: 100%;
    line-height: 2.30769231;
    padding: 0 12px;
    transition: background-color .3s ease-in;
    display: inline-block;
    text-decoration: none;
    font-size: 13px;
    line-height: 2.15384615;
    min-height: 30px;
    margin: 0;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    appearance: none;
    border-radius: 3px;
    white-space: nowrap;
    box-sizing: border-box;
    text-decoration: none;
    text-shadow: none;
    cursor: pointer;
    margin-top: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
       background-color: #4278a3;
       cursor: pointer;
    }

    ${ p => p.leftMargin ? `
        margin-left: 20px;
    ` : ''};

    ${ p => p.disabled ? `
        cursor: default;
        border: 1px solid rgb(220, 220, 222);
        color: #a7aaad;
        background-color: #f6f7f7;
        &:hover {
            background-color: #f6f7f7;
            cursor: default;
        }
    ` : ''};

`;

export const StyledIcon = styled('div')`
    position: absolute;
    right: 7px;
`;

