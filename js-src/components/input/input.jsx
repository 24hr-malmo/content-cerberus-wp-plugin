import { StyledInputBox, StyledInputLabel, StyledInput } from './input.style.jsx';

const Input = ({placeholder = '', label = ' ', value, onChange = () => {}}) => {

    const update = (e) => {
        onChange(e.target.value); // current());
    };

    return (
        <StyledInputBox>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledInput type="text" value={value()} placeholder={placeholder} onKeyup={update} />
        </StyledInputBox>
    );

};

export default Input;
