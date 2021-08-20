import { createSignal } from 'solid-js';
import { StyledInputBox, StyledInputLabel, StyledSelect } from './select.style.jsx';

const Select = ({options = [], placeholder = '', label = ' ', value, onChange = () => {}}) => {

    const update = (e) => {
        console.log(e);
        onChange(e.target.value);
    };

    return (
        <StyledInputBox>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledSelect value={value()} placeholder={placeholder} onChange={update}>
                <For each={options}>{
                    (option) => (
                        <option value={option.value} selected={option.value === value()}>{option.label}</option>
                    )
                }</For>
            </StyledSelect>
        </StyledInputBox>
    );

};

export default Select;
