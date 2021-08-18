import { useContext } from 'solid-js';
import { StyledLink, Container } from './navigation.styled.jsx';
import { AppContext } from '../context/app-context.jsx';

const Navigation = () => {

    const [state, { navigate }] = useContext(AppContext);

    return (
        <Container>
            <StyledLink href="#start">Start</StyledLink>
            <StyledLink href="#sync-check">Sync Check</StyledLink>
            <StyledLink href="#sync-draft">Sync Draft</StyledLink>
            <StyledLink href="#sync-live">Sync Live</StyledLink>
        </Container>
    );

};

export default Navigation;
