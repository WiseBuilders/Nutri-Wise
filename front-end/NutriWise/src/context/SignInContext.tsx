import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios"; // Importa o Axios


interface SignInProviderProps{
    children: ReactNode
}

export interface SignInData{
    name: string; 
    birthdate: string;
    gender: string;
    weight: string;
    height: string;
    email: string; 
    password: string; 
}

interface ISignInContextData{
    sigInDataStatus: boolean;
    getSignInData: ({birthdate,email,gender,height,name,password,weight}: SignInData) => void;
}

const SignInContext = createContext({} as ISignInContextData);


function SignInProvider({children}: SignInProviderProps){

    const[sigInDataStatus, setSigInDataStatus] = useState<boolean>(false);

    async function getSignInData({birthdate,email,gender,height,name,password,weight}:SignInData ){
        const userData = {
            birthdate,
            email,
            gender,
            height,
            name,
            password,
            weight,
        }

        try {
            // Faz a requisição para o backend para criar um novo usuário
            const response = await axios.post("http://localhost:3000/api/users/register", userData);
      
            // Se o usuário for criado com sucesso, atualize o estado
            if (response.status === 201) {
              setSigInDataStatus(true);
              console.log("Usuário criado com sucesso!");
            }
          } catch (error: any) {
            // Verifica se o erro é relacionado ao email já cadastrado
            if (error.response && error.response.status === 400) {
              setSigInDataStatus(false);
              console.log("Erro: ", error.response.data.message); // Mensagem de erro vinda do backend
            } else {
              setSigInDataStatus(false);
              console.error("Erro ao criar usuário: ", error.message);
            }
        }
             
    }
    
    return(
        <SignInContext.Provider value={{sigInDataStatus, getSignInData}}>
            {children}
        </SignInContext.Provider>
    );
}

function useSignIn(){
    const context = useContext(SignInContext);
    return context
}

export { SignInProvider, useSignIn};