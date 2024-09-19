import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
}

export interface LabelProps {
    fontColor: string;
}

export const Container = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content:center ;
    background-color: ${(props) => props.color};
    padding: 0.25em 5em;
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
    font-size: 1.15em;
`