import { Container, Content, Actions } from './page-top.style.jsx';
import Text from '../text/text.jsx';
import { Heading2 } from '../heading/heading.jsx';

const PageTop = (props) => {
    return (
        <Container>
            <Content>
                <Heading2>{props.title}</Heading2>
                <Text>{props.description}</Text>
            </Content>
            <Actions>
                { props.actions }
            </Actions>
        </Container>
    );
};

export default PageTop;
