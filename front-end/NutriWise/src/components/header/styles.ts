import { styled } from "styled-components";

export const HeaderContainer = styled.div`
    background-color: #F97F33;
    border-radius: 0 0 20px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
`;
export const NameUserText = styled.h2`
    color: #FFF;
    font-size: 37px;
    font-weight: 600;
`;
export const Text = styled.p`
    margin: 10px 0;
`;

export const MeuPerfilBotao = styled.div`
    display: flex;
    align-items: center;
    border: solid;
    border-color: #FFF;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    background-color: #0EC320;
`;

export const Img = styled.img`
  width: 100px;
  margin-right: 5px;

  @media (min-width: 768px) {
    width: 80px;
  }
`;
