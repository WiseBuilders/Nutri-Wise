import {ErrorMessage,Field,Form, Formik } from 'formik';
import * as Yup from 'yup';
import logo from "../../assets/logo.png";
import { Container,
    Description,
    ErrorText,
    Img,
    Input,
    Text2,
    SignUpContainer,
    Title,
    Text,
    WeightLenghtContainer,
} from "./styles";
import Popup from "../../components/popup/Index";
import Button from '../../components/button/Index';
import {useSignIn } from '../../context/SignInContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
  
const SignUp = ()=>{
    const navigate = useNavigate();

    const {getSignInData, sigInError, createUserSuccess} = useSignIn();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('O nome é obrigatório'),
        birthdate: Yup.string()
          .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de nascimento deve estar no formato DD/MM/AAAA')
          .required('A data de nascimento é obrigatória'),
        gender: Yup.string()
            .required('O sexo sigInErroré obrigatório'),
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
    });

    const handleSubmit = (values: any) => {
        getSignInData(values);
        
    };

    useEffect(()=>{
        createUserSuccess && navigate('/logIn');
        
    },[createUserSuccess])

    return(
        <Container>
            <SignUpContainer>
                <Img src={logo}/>
                <Title>Cadastro de Usuário</Title>
                <Description>
                    Precisaremos de alguns de seus dados para cálculos e
                    maior precisão nos resultados
                </Description>
 
                <Formik
                    initialValues={{name:'', birthdate:"",gender:"",weight:"",
                        height:"",email:"", password:""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                <Form style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>            
                    <Text style={{alignItems: "left", position:"relative", marginRight:"21em" }}>Nome</Text>
                    <Input type="text" name="name" placeholder="Digite seu nome completo"/>
                    <ErrorMessage name="name" component={ErrorText} />
                                   
                    <Text style={{alignItems: "left", position:"relative", marginRight:"16em" }}>Data Nascimento</Text>
                        <Input type="text" name="birthdate" placeholder="dd/mm/aaaa"/>
                        <ErrorMessage name="birthdate" component={ErrorText} />
                                                               
                        <Text>Sexo</Text>
                        <Field as="select" name="gender">
                            <option value="">Selecione o Sexo</option>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                        </Field>
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
                                type="submit"
                                style={{width: "9em", height: "3.5em", borderRadius: "8px"}}
                            />
                        </div>     
                        
                        </Form>    
                </Formik>
                
            </SignUpContainer>
                {/* Exibe o popup se houver uma mensagem de erro */}
                {sigInError && <Popup message='Erro ao criar usuário.' type="error" />}
        </Container>
    )
}
 
export default SignUp;