import {ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from "../../assets/logo.png";
import { Container, 
    Description, 
    ErrorText, 
    Texto,
    Img, 
    Sexo,
    Input, 
    Select, 
    SignUpContainer, 
    Title, 
    Text,
    WeightLenghtContainer,
    FormWrapper
} from "./styles";
import Button from '../../components/button/Index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInData, useSignIn } from '../../context/SignInContext';


const SignUp = ()=>{
    const [switchForm, setSwitchForm] = useState(false);

    const {getSignInData, sigInDataStatus} = useSignIn();
    
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('O nome é obrigatório'),
        birthdate: Yup.string()
          .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de nascimento deve estar no formato DD/MM/AAAA')
          .required('A data de nascimento é obrigatória'),
        gender: Yup.string()
            .required('O gênero é obrigatório'),
        weight: Yup.number()
            .typeError('Peso deve ser em número')
            .required('A peso é obrigatório'),
        height: Yup.number()
            .typeError('Altura deve ser número')
            .required('A altura é obrigatório'),
        email: Yup.string()
            .email('Email inválido')
            .required('O email é obrigatório'),
        password: Yup.string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres')
            .required('A senha é obrigatória'),
        question1: Yup.string(),
        question2: Yup.string(),
        question3: Yup.string(),
    });

    function handleSwitchForm(){
        setSwitchForm(true);
    }

    function handleClick({birthdate,email,gender,height,name,password,question1,question2,question3,weight}: SignInData){
        if(!sigInDataStatus){
            getSignInData({
                birthdate,
                email,
                gender,
                height,
                name,
                password,
                question1,
                question2,
                question3,
                weight
            });
            navigate('/')
        } else{
            console.log('sigInDataStatus: ', sigInDataStatus)
            alert('UsuarioJa cadastrado');
            setSwitchForm(false);
        }
    }

    return(
        <Container>
            <SignUpContainer>
                <Img src={logo}/>
                <Title>Cadastro de Usuário</Title>
                <Description>
                    Precisaremos de alguns de seus dados para cálculos e 
                    maior precisão nos resultados 
                </Description>

                <FormWrapper
                    initialValues={{name:'', birthdate:"",gender:"",weight:"",
                        height:"",email:"", password:"", question1:"", question2:"",
                        question3: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) =>console.log('values: ', values)}
                >
                    {({values}:any)=>(
                        <>
                        {switchForm ? 
                            <>
                                <Text>Existe algum alimento que não possa consumir?</Text>
                                <Input type="text" name="question1"/>

                                <Text>Você tem alguma alergia? a quê?</Text>
                                <Input type="text" name="question2"/>

                                <Text>Você tem alguma destas condições de saúde?</Text>
                                <Input type="text" name="question3"/>

                                <div style={{marginTop: '15px'}}>
                                    <Button
                                        label='Cadastrar'
                                        color='#F6F8B0'
                                        fontColor='#F97F33'
                                        handleClick={()=>handleClick(values)}
                                        style={{width:"8em", height: "3em", marginTop: '15px'}}
                                    />
                                </div> 

                            </> 
                            :
                            <>
                         <Texto>
                                <Text>Nome</Text>
                                <Input type="text" name="name" placeholder="Digite seu nome completo"/>
                                <ErrorMessage name="name" component={ErrorText} />
                                

                                <Text>Data de nascimento</Text>
                                <Input type="text" name="birthdate" placeholder="dd/mm/aaaa"/>
                                <ErrorMessage name="birthdate" component={ErrorText} />
                         </Texto>

                          <Sexo>
                                <Text>Sexo</Text>
                                <Select as="select" name="gender">
                                    <option value="">Selecione o Sexo</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                </Select>
                                <ErrorMessage name="gender" component={ErrorText} />
                          </Sexo>


                                
                        <WeightLenghtContainer>
                        <div>
                        <Text>Peso</Text>
                                        <Input 
                                            type="text" 
                                            name="weight" 
                                            placeholder="Digite seu Peso"
                                            
                                        />
                                        <ErrorMessage name="weight" component={ErrorText} />
                                    </div>

                                    
                                    <div>
                                    <Text>Altura</Text>
                                        <Input 
                                            type="text" 
                                            name="height" 
                                            placeholder="Digite sua Altura"
                                        />
                                        <ErrorMessage name="height" component={ErrorText} />
                                    </div>
                                        
                                </WeightLenghtContainer>
                              

                            <Texto>
                                <Text>E-mail</Text>
                                <Input type="email" name="email" placeholder="Digite seu nome e-mail"/>
                                <ErrorMessage name="email" component={ErrorText} />
                
                                <Text>Senha</Text>
                                <Input type="password" name="password" placeholder="Crie sua senha"/>
                                <ErrorMessage name="password" component={ErrorText} />
                            </Texto>


                                <div style={{marginTop: '30px'}}>
                                    <Button
                                        label='Continuar'
                                        color='#F6F8B0'
                                        fontColor='#F97F33'
                                        handleClick={handleSwitchForm}
                                        style={{width:"8em", height: "3em"}}
                                    />
                                </div> 
                            </>
                        
                        }
                                
                             
                        </>
                    )}
                </FormWrapper>
            </SignUpContainer>
     
        </Container>
    )
}

export default SignUp;