import { StyledSvg } from './loading.styled.jsx';

const sizes = {
    small: '20px',
    medium: '30px',
    large: '50px',
    xlarge: '100px',
};

const Loading = ({size = 'large', inverted = false}) => {

    let width = sizes[size];
    let height = sizes[size];
    let style = {
        display: 'block',
        'shape-rendering': 'auto',
        width,
        height,
        stroke: '#006ba1',
    }

    if (inverted) {
        style.stroke = '#fff';
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style={ style } width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="32" stroke-width="8" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2.0408163265306123s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
            </circle>
        </svg>
    );

};

export default Loading;

