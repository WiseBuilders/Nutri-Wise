import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
}

interface LabelProps {
    fontColor: string;
}

export const Container = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content:center ;
    background-color: ${(props) => props.color};
    padding: 0.25em 1em;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    user-select: none;
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        transform: scale(0.95);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`;

export const Label = styled.div<LabelProps>`
    color: ${(props) => props.fontColor};
`