import Loading from '../loading/loading.jsx';

import { StyledButton, StyledIcon } from './button.style.jsx';

const Button = (props) => {

    const disabledProps = {...props};
    disabledProps.onClick = () => {};

    return (
        <StyledButton {...props}>
            {props.children}
            <Show when={props.loading}>
                <StyledIcon><Loading size="small" inverted={!props.disabled} /></StyledIcon>
            </Show>
        </StyledButton>
    );

};

export default Button;

