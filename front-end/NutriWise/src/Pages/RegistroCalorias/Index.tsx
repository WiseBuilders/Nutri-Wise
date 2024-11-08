import React from 'react';
import Header from '../../components/header/Index';
import { useLogIn } from '../../context/LogInContext';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Container, ChartContainer, InnerContainer, SmallContainer, Input } from './styles';
import Button from '../../components/button/Index';
import { useNavigate } from 'react-router-dom';


const dados:any = [
    {
        "calorias": '1000',
        "data": "05/11/2024"
    },
    {
        "calorias": '2000',
        "data": "06/11/2024"
    },
    {
        "calorias": '1700',
        "data": "07/11/2024"
    },
]
const RegistroCalorias: React.FC = () => {
    const {userData} = useLogIn();
    const {weight,email,gender,height,name} = userData;
    const navigate = useNavigate();
  return(
    <>
        <Header email={email} gender={gender} height={height} name={name} weight={weight}/>
        <Container>
            <h1 style={{textAlign: 'center', margin: '10px', color: '#068713'}}>Registro de Calorias</h1>
            <div style={{display:'flex'}}>
                <InnerContainer>
                    <SmallContainer>
                        <p >Crie uma refeição</p>
                        <Button
                            onClick={()=>navigate('/pesquisaAlimentos')}
                            color="#69E876"
                            label="Adicionar Refeição"
                            fontColor="#068713"
                            style={{
                                width:"10em",
                                height: "4em",
                                border:"solid",
                                borderColor: "#068713",
                                borderRadius: "10px"
                            }}
                        />   
                    </SmallContainer>

                    <SmallContainer>
                        <p>Total de Calorias</p>
                        <Input/>
                    </SmallContainer>
                </InnerContainer>
                <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dados}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="calorias" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>

            </div>
            
        </Container>
    </>
  );
}

export default RegistroCalorias;