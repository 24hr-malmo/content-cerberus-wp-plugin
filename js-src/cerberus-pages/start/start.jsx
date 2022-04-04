import { styled } from 'solid-styled-components';

import Page from '../../components/page/page.jsx';
import PageTop from '../../components/page-top/page-top.jsx';
import Text from '../../components/text/text.jsx';

const Warning = styled('p')`
    font-size: 14px;
    padding-bottom: .5rem;
    background-color: #ffeaee;
    border: 2px solid #ffc0cb;
    border-radius: 3px;
    padding: 1rem 2rem;
    text-align: center;
`;


const Start = () => {

    return (
        <Page>
            <PageTop
                title="Start"
                description="This plugin lets you control and debug content through the content service."
            />
            <Warning>This is mainly used while developing or by admins!</Warning>
        </Page>
    );

};

export default Start;


