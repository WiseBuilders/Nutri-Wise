import {ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from "../../assets/logo.png";
import { Container,
    Description,
    ErrorText,
    Img,
    Input,
    Select,
    Text2,
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
            .required('O sexo é obrigatório'),
        weight: Yup.number()
            .typeError('Peso deve ser em número')
            .required('O peso é obrigatório'),
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
        console.log('sigInDataStatus: ', sigInDataStatus)
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
            alert('Usuario já cadastrado');
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
                                
                                    
 
                            </>
                            :
                            <>
                                <Text style={{alignItems: "left", position:"relative", marginRight:"21em" }}>Nome</Text>
                                <Input type="text" name="name" placeholder="Digite seu nome completo"/>
                                <ErrorMessage name="name" component={ErrorText} />
                                   
                                <Text style={{alignItems: "left", position:"relative", marginRight:"16em" }}>Data Nascimento</Text>
                                <Input type="text" name="birthdate" placeholder="dd/mm/aaaa"/>
                                <ErrorMessage name="birthdate" component={ErrorText} />
                                                               
                                <Text>Sexo</Text>
                                <Select as="select" name="gender">
                                    <option value="">Selecione o Sexo</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                </Select>
                                <ErrorMessage name="gender" component={ErrorText} />
                                   
                                <WeightLenghtContainer style={{marginLeft:"2em"}}>
                                    <Text2>Peso
                                        <Input
                                            type="text"
                                            name="weight"
                                            placeholder="Digite seu Peso"
                                           
                                        />
                                        <ErrorMessage name="weight" component={ErrorText} />
                                        </Text2>
                                   
                                    <Text2>Altura
                                        <Input
                                            type="text"
                                            name="height"
                                            placeholder="Digite sua Altura"
                                        />
                                        <ErrorMessage name="height" component={ErrorText} />
                                        </Text2>
                                       
                                </WeightLenghtContainer>
 
                                <Text style={{alignItems: "left", position:"relative", marginRight:"21em" }}>E-mail</Text>
                                <Input type="email" name="email" placeholder="Digite seu nome e-mail"/>
                                <ErrorMessage name="email" component={ErrorText} />
               
                                <Text style={{alignItems: "left", position:"relative", marginRight:"21em" }}>Senha</Text>
                                <Input type="password" name="password" placeholder="Crie sua senha"/>
                                <ErrorMessage name="password" component={ErrorText} />
 
                                <div style={{marginTop: '2.5em'}}>
                                <Button
                                        label='Cadastrar'
                                        color='#F6F8B0'
                                        fontColor='#F97F33'
                                        handleClick={()=>handleClick(values)}
                                        style={{width: "9em", height: "3.5em", borderRadius: "8px"}}
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