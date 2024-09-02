import Button from "../../components/button/Index";
import logo from "../../assets/logo.png";
import { Container,Title, Img, Description,ButtonContainer } from "./styles";

const Main =()=>{
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
                    label='Login'
                    style={{width:"8em"}}
                />
                <Button
                    color='#F97F33'
                    label='Cadastre-se'
                    style={{width:"8em"}}
                />
            </ButtonContainer>
        </Container>
    )
}

export default Main;