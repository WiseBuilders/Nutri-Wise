import { Container, Label } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
    label: string;
    fontColor: string;
    handleClick?: ()=> void;
}

const Button: React.FC<ButtonProps> = ({ color, label,handleClick,fontColor, ...rest })=>{

    return(
        <Container 
            color= {color}
            onClick={handleClick}
            {...rest}
        >
            <Label
                fontColor={fontColor}
            >{label}
            </Label>
        </Container>
    )
}

export default Button;



