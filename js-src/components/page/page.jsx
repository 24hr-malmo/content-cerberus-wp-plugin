import { Container } from './page.style.jsx';

const Page = (props) => {
    return (
        <Container>{props.children}</Container>
    );
};

export default Page;
