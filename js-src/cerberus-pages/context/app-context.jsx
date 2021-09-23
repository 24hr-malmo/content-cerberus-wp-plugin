import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const AppContext = createContext([{ path: 'start'}, {}]);

export function AppProvider(props) {

    const startPath = location.hash.replace(/#/, '') || 'sync-check';

    const [state, setState] = createStore({
        path: startPath,
    });

    window.addEventListener('popstate', (event) => {
        const path = event.target.location.hash.replace(/#/, '');
        setState({
            ...state,
            path,
        });
    });

    const store = [
        state, {
            apiUrl: props.values.api,
        }
    ];

    return (
        <AppContext.Provider value={store}>
        {props.children}
        </AppContext.Provider>
    );
};
