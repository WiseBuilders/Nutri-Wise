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
    question1:string; 
    question2: string;
    question3: string;
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


    function getUserData({email,password}: LogInInterface){
        
        //1. Pega todos os usuario no localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        //2. Procura no array de usuarios se a senha e password digitados contem no array usuarios
        const validatedUser: UserInterface = users.find((user: UserInterface) => {
            return user.email === email && user.password === password;
        });
        console.log('validatedUser: ', validated)
        //3. Se tiver um usuario com a mesma senha e login, salva as informaçoes na variavel
        if(validatedUser){
            console.log('Usuario validado')
            setUserData(validatedUser);
            setValidated({loginValidated: true, message: "Login sucesso", type:"success"})
            
        }else{
            console.log('Usuario nao validado')
            setValidated({loginValidated: false, message: "Senha ou e-mail incorretos", type:"error"})
        }
        console.log('loginValidated: ', validated)
        
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