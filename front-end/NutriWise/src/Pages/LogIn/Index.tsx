import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import logo from "../../assets/logo.png";
import Button from "../../components/button/Index";
import { Container,
    LogInContainer,
    OuterContainer,
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
import { useEffect, useState } from "react";
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
        <Container style={{backgroundColor: "#0EC320"}}>
            {/* Mostra o popup somente quando showPopup for true */}
            {showPopup && (
                <Popup
                    message={message}
                    type={type}
                />
            )}
            <OuterContainer style= {{backgroundColor: "#0EC320", minHeight: "100vh", paddingLeft: "30em", paddingRight: "30em"}}>
            <LogInContainer>
                <TittleContainer>
                    <TittleText>Login</TittleText>
                </TittleContainer>
                <Img src={logo} />
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => getUserData(values)}
                   
                >
                    <Form style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", marginRight: "6em" }}>
 
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
                        <Link style={{marginLeft: "6em"}} href="url">Esqueceu sua senha? Redefina aqui.</Link>
                        <Button
                            type="submit"
                            color="#00A000"
                            label="Login"
                            fontColor="#FFFFFF"
                            style={{width:"10em",
                            marginLeft:"12.5em",
                                height: "4em",
                                border:"solid",
                                borderColor: "#ffffff",
                                borderRadius: "10px"
                            }}
                        />
 
                    </Form>
                </Formik>
            </LogInContainer>
            </OuterContainer>
        </Container>
    )
}
 
export default LogIn