import { styled } from 'solid-styled-components';

export const StyledContainer = styled('div')`
    padding-top: 6px;

    ${p => p.horizontal ? `
        display: flex;   
        align-items: center;
    ` : '' } 

    ${p => p.box ? `
        position: relative;
        min-width: 255px;
        border: 1px solid #ccd0d4;
        box-shadow: 0 1px 1px rgb(0 0 0 / 4%);
        background: #fff;
        padding: 1rem;
        box-sizing: border-box;
        margin-bottom: 7px;
    ` : ''}

`;

export const StyledChecking = styled('div')`
    color: #a7aaad;
    border: 1px solid rgb(220, 220, 222);
    background: #f6f7f7;
    padding: .75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;

    ${p => p.horizontal ? `
        flex-direction: row;
        align-items: center;
    ` : '' } 

`;

export const StyledStatusText = styled('div')`
    text-align: center;
    min-width: 100px;
    ${p => p.horizontal ? `
        margin-top: 10px;
    ` : '' }

`;

