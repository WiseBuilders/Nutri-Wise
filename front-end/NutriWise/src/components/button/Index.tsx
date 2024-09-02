import { Container, Label } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ color, label, ...rest })=>{

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Haduken', event)
    };


    return(
        <Container 
            color= {color}
            onClick={handleClick}
            {...rest}
        >
            <Label>{label}</Label>
        </Container>
    )
}

export default Button;



