import { useContext } from 'solid-js';

import { AppContext } from '../context/app-context.jsx';
import Navigation from '../navigation/navigation.jsx';
import SyncContent from '../sync-content/sync-content.jsx';
import SyncCheck from '../sync-check/sync-check.jsx';
import { Heading1 } from '../../components/heading/heading.jsx';
import { StyledContainer } from './app.styled.jsx';

const App = () => {

    const [ state ] = useContext(AppContext);

    return (
        <StyledContainer>
            <Heading1>Content Dashboard</Heading1>
            <Navigation />
            <Show when={ state.path === 'sync-check' }><SyncCheck/></Show>
            <Show when={ state.path === 'sync-draft' }><SyncContent type="draft"/></Show>
            <Show when={ state.path === 'sync-live' }><SyncContent type="live"/></Show>
        </StyledContainer>
    );

};

export default App;

