import Button from "../../components/button/Index";
import logo from "../../assets/logo.png";
import { Container,Title, Img, Description,ButtonContainer } from "./styles";
import { useNavigate } from "react-router-dom";

const Main =()=>{

    const navigate = useNavigate();

    function handleClick(){
       console.log('Haduken!')
    }

    function handleClickSignUp(){
        navigate('/singup')
    }


    return(
        <Container>
            <Title>Olá, seja bem-vindo à NutriWise!</Title>
            <Img src={logo} />
            <Description>
                A NutriWise tem como objetivo auxiliar nossos usuários com o 
                controle nutricional, registro de calorias gastas e consumidas e seu 
                balanceamento para buscar o melhor da sua saúde!
            </Description>
            <ButtonContainer>
                <Button
                    color='#068713'
                    fontColor="#FFFFFF"
                    label='Login'
                    handleClick={handleClick}
                    style={{width:"8em"}}
                />
                <Button
                    color='#F97F33'
                    fontColor="#FFFFFF"
                    label='Cadastre-se'
                    handleClick={handleClickSignUp}
                    style={{width:"8em"}}
                />
            </ButtonContainer>
        </Container>
    )
}

export default Main;