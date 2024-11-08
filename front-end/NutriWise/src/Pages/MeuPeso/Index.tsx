import Header from '../../components/header/Index';
import { useLogIn } from '../../context/LogInContext';
import { usePeso } from '../../context/PesoContext';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/button/Index';
import { ChartContainer, Container, ErrorText, Input, InputWrapper, Label,Text } from './styles';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';

const MeuPeso = () => {
    const [atualizarHistorico, setAtualizarHistorico] = useState(false);

    const {userData} = useLogIn();
    const {postPeso,pesoHistorico,PegarHistorico} = usePeso();
    const {id,weight,email,gender,height,name} = userData;

    const validationSchema = Yup.object().shape({
        peso: Yup.number()
            .typeError('O peso deve ser um número')
            .required('O peso é obrigatório')
            .positive('O peso deve ser positivo'),
        metaAlcancar: Yup.number()
            .typeError('O peso deve ser um número')
            .required('O peso é obrigatório')
            .positive('O peso deve ser positivo')
    });

    useEffect(() => {
        if (atualizarHistorico || pesoHistorico.length === 0) {
            PegarHistorico(id);
            setAtualizarHistorico(false); // Resetar após atualização
        }
    }, [id, atualizarHistorico]); // Dependências: id e atualizarHistorico

    const handleSubmit = async (values:any) => {
        postPeso(values);
        setAtualizarHistorico(true); // Ativa a atualização do histórico
    };
 
  return(
    <>
        <Header email={email} gender={gender} height={height} name={name} weight={weight}/>

        <Container>
            
                
                <Formik
                    initialValues={{usuario_id:id, peso: '', metaAlcancar: ''}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                   
                >
                    <Form style={{ display: "flex", flex: 6, flexDirection: "column",justifyContent: "center", alignItems: "center"}}>
 
                        <Text>Peso</Text>

                        <InputWrapper>
                            <div style={{display:"flex", flexDirection: "column" }}>
                                <Label htmlFor="Peso">Peso Atual</Label>
                                <Input
                                    type="number"
                                    name="peso"
                                    placeholder="Digite seu peso"
                                />
                            </div>
                            
                            <ErrorMessage name="peso" component={ErrorText} />
                        </InputWrapper>

                        <InputWrapper>
                            <div style={{display:"flex", flexDirection: "column" }}>
                                <Label htmlFor="metaAlcancar">Meta a alcançar</Label>
                                <Input
                                    type="number"
                                    name="metaAlcancar"
                                    placeholder="Digite sua meta de peso"
                                />
                            </div>
                            
                            <ErrorMessage name="metaAlcancar" component={ErrorText} />
                        </InputWrapper>
                    
                        <Button
                            type="submit"
                            color="#69E876"
                            label="Confirmar"
                            fontColor="#068713"
                            style={{
                                width:"10em",
                                height: "4em",
                                border:"solid",
                                borderColor: "#068713",
                                borderRadius: "10px"
                            }}
                        />

                    </Form>

                </Formik>
            
            <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pesoHistorico}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="peso" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>

        </Container>
    </>
  );
}

export default MeuPeso;