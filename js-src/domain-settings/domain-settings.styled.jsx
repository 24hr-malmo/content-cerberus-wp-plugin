import { keyframes, styled } from 'solid-styled-components';

const slideInAnimation = keyframes`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 300px;
    }
`;

const slideStartAnimation = keyframes`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 0;
    }
`;

const slideOutAnimation = keyframes`
    0% {
        max-height: 300px;
    }
    100% {
        max-height: 0;
    }
`;

const animations = {
    'open' : slideInAnimation,
    'close' : slideOutAnimation,
    'init' : slideStartAnimation,
};

export const StyledContainer = styled('div')`
     color: black;
     max-width: 1200px;
     margin: 0 auto;
`;

export const StyledTitle = styled('div')`
`;

export const StyledParagraph = styled('div')`
    font-size: 1rem;
    padding: 1rem 0;
`;

export const StyledAddBox = styled('div')`
    display: flex;
    justify-content: flex-end;
`;

export const StyledNewDomainContainer = styled('div')`
    max-height: 0px;
    overflow: hidden;
    ${ p => {
        return `animation: ${animations[ p.state ] } .4s ease-in-out forwards;`;
    } }
`;

export const StyledNewDomainInnerContainer = styled('div')`
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    margin-top: 20px;
    padding: 20px;
`;


export const StyledNewDomainBox = styled('div')`
    width: 100%;
    display: flex;
    padding-bottom: 10px;
`;

export const StyledNewDomainButtonBox = styled('div')`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const StyledRemoveButton = styled('div')`
    background-color: #2271b1;
    font-size: 10px;
    color: white;
    padding: 0px 4px 0px 4px;
    height: 16px;
    line-height: 15px;
    margin: 0 5px 0 0;
    border-radius: 2px;
    cursor: pointer;
    max-width: 30px;
    text-align: center;
`;

export const StyledTable = styled('table')`
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 3px;
    border: 1px solid #aaa;
    box-sizing: border-box;
    width: 100%;
    thead {
        text-align: left;
    }
`;

export const StyledTDActions = styled('td')`
    display: flex;
    justify-content: flex-end;
`;


