import { styled } from 'solid-styled-components';

// This is a div otherwise WP overrides the h1 in a very peculiar way
export const Heading1 = styled('div')`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    margin: 2rem 0 4rem;
    line-height: 1.2;
    display: block;
`;

export const Heading2 = styled('h2')`
    font-size: 24px;
    margin-bottom: .5rem;
`;

export const Heading3 = styled('h3')`
    font-size: 18px;
    margin-bottom: .5rem;
    margin-top: 0px;
`;


