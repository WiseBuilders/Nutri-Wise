import styled from "styled-components";
import Button from "../../components/button/Index";


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

export const QuestionContainer = styled.div`
    background-color: #0EC320;
    padding: 10px 15px;
    color: #fff;
    border-radius: 10px;
    border-color: #F6F8B0;
    border: solid;
    border-width: 1px;
    margin-bottom: 10px;
`;

export const OptionsContainer = styled.div`
    background-color: #9FF5A7;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    height: 75vh;
    justify-content: space-around;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

`

export const DashboardButton = styled(Button)`
    width: 436px;
    height: 132px;
    font-size: 32px;
    border: solid;
    border-color: #068713;

    @media only screen and (max-width: 1400px) {
        font-size: 24px;
    }
`;