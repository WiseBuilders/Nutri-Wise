import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import logo from "../../assets/logo.png";
import Button from "../../components/button/Index";
import { Container, 
    LogInContainer, 
    Img, 
    TittleContainer, 
    TittleText, 
    ErrorText, 
    Input, 
    Label, 
    InputWrapper,
    Link
} from "./styles";
import { useLogIn } from "../../context/LogInContext";
import Popup from "../../components/popup/Index";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ()=>{
   
    const {getUserData,validated} = useLogIn();
    const {loginValidated,message,type} = validated;

    const navigate = useNavigate();

    // Estado para controlar a exibição do Popup
    const [showPopup, setShowPopup] = useState(false);
   
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Formato do e-mail inválido'),
        password: Yup.string().required('Digite uma senha')
    });

    const handleLogin = useCallback((values: any)=>{
        getUserData(values);
    },[getUserData])
    
    useEffect(() => {
        if (loginValidated === true) {
          // Redireciona para a dashboard se o login for validado
          navigate('/dashboard');
        } else if (loginValidated === false) {
          // Mostra o popup se a validação falhar
          setShowPopup(true);
          const timer = setTimeout(() => {
            setShowPopup(false);
          }, 3000);
          return () => clearTimeout(timer); // Limpa o timeout ao desmontar
        }
    }, [loginValidated, navigate]);

    return(
        <Container>
            {/* Mostra o popup somente quando showPopup for true */}
            {showPopup && (
                <Popup 
                    message={message}
                    type={type}
                />
            )}
            <LogInContainer>
                <TittleContainer>
                    <TittleText>LogIn</TittleText>
                    <Img src={logo} />
                </TittleContainer>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleLogin(values)}
                    
                >
                    <Form style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                        <InputWrapper>
                            <Label htmlFor="Email">E-mail</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Digite seu E-mail"
                            />
                            <ErrorMessage name="email" component={ErrorText} />
                        </InputWrapper>

                        <InputWrapper>
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Digite sua senha de cadastro"
                            />
                            <ErrorMessage name="password" component={ErrorText} />
                        </InputWrapper>
                        <Link href="url">Esqueceu sua senha? Redefina aqui.</Link>
                        <Button 
                            type="submit"
                            color="#00A000"
                            label="Login"
                            fontColor="#FFFFFF"
                            style={{width:"10em", 
                                height: "3em", 
                                border:"solid", 
                                borderColor: "#ffffff" 
                            }}
                        />
                    </Form>
                </Formik>

            </LogInContainer>
        </Container>
    )
}

export default LogIn