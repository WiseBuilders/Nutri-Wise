import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import foto from "../../assets/foto.svg";

import { HeaderContainer, MeuPerfilBotao, NameUserText,Text, Img } from "./styles";

interface IdadosPessoais{
    name: string,
    email: string,
    gender: string,
    height: number,
    weight: number
}

const Header: React.FC<IdadosPessoais> = (dadosPessoais) => {
    const [mostrarInfo, setMostrarInfo] = useState(true)

    const {email,gender,height,name,weight} = dadosPessoais;
    
    function alterarInfo(){
        setMostrarInfo((prev) => !prev);
    }

    return(
        <HeaderContainer>
            <MeuPerfilBotao onClick={()=>alterarInfo()}>
                <Img src={foto}/>
                <Text>Meu Perfil</Text>
            </MeuPerfilBotao>
            
            {mostrarInfo && 
                <>
                <div>
                    <NameUserText>{name}</NameUserText>
                    <Text>Nome Completo: {name}</Text>
                    <Text>E-mail: {email}</Text>
                    <Text>Sexo: {gender}</Text>
                </div>
                <div>
                    <Text>Altura: {height}m</Text>
                    <Text>Peso: {weight}kg</Text> 
                </div> 
                </>
            }
            
            <Img src={logo}/>
        </HeaderContainer>
  );
}

export default Header;