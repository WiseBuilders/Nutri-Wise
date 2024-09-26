import { createContext, ReactNode, useContext, useState } from "react";


interface SignInProviderProps{
    children: ReactNode
}

export interface SignInData{
    name: string; 
    birthdate: string;
    gender: string;
    weight: number;
    height: number;
    email: string; 
    password: string; 
    question1:string; 
    question2: string;
    question3: string;

}

interface ISignInContextData{
    sigInDataStatus: boolean;
    getSignInData: (data: SignInData) => void;
}

const SignInContext = createContext({} as ISignInContextData);


function SignInProvider({children}: SignInProviderProps){

    const[sigInDataStatus, setSigInDataStatus] = useState<boolean>(false);

    function getSignInData({birthdate,email,gender,height,name,password,question1,question2,question3,weight}:SignInData ){
        const userData = {
            birthdate,
            email,
            gender,
            height,
            name,
            password,
            question1,
            question2,
            question3,
            weight,
        }

         // 1. Recupera os usuários já cadastrados do localStorage (ou inicializa um array vazio)
        const users = JSON.parse(localStorage.getItem('users') || '[]');
      
        //2. Verifica se aquele email já esta cadastrado
        const emailExist = users.find((user: SignInData) => {
            return user.email === email;
        });

        console.log('emailExist: ', emailExist)

        if(emailExist){
            setSigInDataStatus(false);
        }else{
            // 2. Adiciona o novo usuário ao array
            users.push(userData);
            setSigInDataStatus(true);
            // 3. Armazena o array atualizado de volta no localStorage
            localStorage.setItem('users', JSON.stringify(users));
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