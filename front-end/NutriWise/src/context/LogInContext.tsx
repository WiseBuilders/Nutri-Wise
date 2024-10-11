import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface LogInProviderProps{
    children: ReactNode
}

interface UserInterface{
    name: string; 
    birthdate: string;
    gender: string;
    weight: number;
    height: number;
    email: string; 
    password: string;
}

export interface LogInInterface{
    email: string;
    password: string
}

interface MessageInterface{
    loginValidated: boolean | null;
    message: string;
    type: 'success' | 'error';
}

interface ILogInContextData{
    validated: MessageInterface;
    userData: UserInterface;
    getUserData: ({email,password}: LogInInterface) => void;
}

const LogInContext = createContext({} as ILogInContextData);

function LogInProvider({children}: LogInProviderProps){
    const [userData, setUserData] = useState<UserInterface>({} as UserInterface)
    const [validated, setValidated] = useState<MessageInterface>({} as MessageInterface)


    async function getUserData({email,password}: LogInInterface){
        console.log('email,password: ', email,password);
        try {
            // Faz a requisição para o back-end com as credenciais de login
            const response = await axios.post("http://localhost:3000/api/auth/login", {
              email,
              password,
            });
      
            // Verifica se a resposta foi bem-sucedida
            if (response.data) {
            
              setUserData(response.data); // Define os dados do usuário retornados pela API
              setValidated({
                loginValidated: true,
                message: "Login sucesso",
                type: "success",
              });
            }
        } catch (error: any) {
            // Caso ocorra um erro (como credenciais inválidas)
            setValidated({
              loginValidated: false,
              message: error.response?.data?.message || "Senha ou e-mail incorretos",
              type: "error",
            });
        }
        
    }

    return(
        <LogInContext.Provider value={{userData, getUserData,validated}}>
            {children}
        </LogInContext.Provider>
    )
}

function useLogIn(){
    const context = useContext(LogInContext);
    return context
}

export { LogInProvider, useLogIn};