import { useLogIn } from "../../context/LogInContext";
import { ButtonsContainer, DashboardButton, OptionsContainer,} from "./styles";

import Header from "../../components/header/Index";
import { useNavigate } from "react-router-dom";
const Dashboard = ()=>{
    const {userData} = useLogIn();
    const {weight,email,gender,height,name} = userData;
    const navigate = useNavigate();
    return(
        <>
            <Header email={email} gender={gender} height={height} name={name} weight={weight}/>
            <OptionsContainer>
                <ButtonsContainer>
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Meu Peso"
                        onClick={()=>navigate('/meuPeso')}
                    />
                    <DashboardButton
                        color="#0EC320"
                        fontColor="#FFFF"
                        label="Refeições e Calorias"
                        onClick={()=>navigate('/registroCalorias')}
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