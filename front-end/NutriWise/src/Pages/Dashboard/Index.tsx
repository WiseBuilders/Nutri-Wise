import { useLogIn } from "../../context/LogInContext";
import { Img } from "../LogIn/styles";
import { ButtonsContainer, DashboardButton, HeaderContainer, NameUserText, OptionsContainer, Text } from "./styles";
import logo from "../../assets/logo.png";
import foto from "../../assets/foto.svg";
const Dashboard = ()=>{
    const {userData} = useLogIn();
    const {email,gender,height,name,weight} = userData;

    return(
        <>
            <HeaderContainer>
                <Img src={foto}/>
                <div>
                    <NameUserText>{name}</NameUserText>
                    <Text>Nome Completo: {name}</Text>
                    <Text>E-mail: {email}</Text>
                    <Text>Sexo: {gender}</Text>
                </div>
                <div>
                    <Text>Altura: {height}m</Text>
                    <Text>Peso: {weight}kg</Text> 
                </div> 
                <Img src={logo}/>
            </HeaderContainer>
            <OptionsContainer>
                <ButtonsContainer>
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Meu Peso"
                    />
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Refeições e Calorias"
                    />
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Consequências"
                    />
                </ButtonsContainer>
                <ButtonsContainer>
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Cálculo IMC"
                    />
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Exercícios Fisicos"
                    />
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Histórico de Consumo"
                    />
                </ButtonsContainer>
                
            </OptionsContainer>
        </>
        
    )
}
export default Dashboard