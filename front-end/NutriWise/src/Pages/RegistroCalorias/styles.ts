import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #9FF5A7;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    height: 75vh;
    justify-content: space-around;
    flex-direction: column;
`;

export const ChartContainer = styled.div`
    flex: 6;
     width: 100%;
    height: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 20px;
`;

export const InnerContainer = styled.div`
    flex-direction: column;
    display: flex;
    flex: 6;
    align-items: center;
`;

export const SmallContainer = styled.div`
    flex: 6; 
    justify-content: space-evenly; 
    align-items: center; 
    display: flex;
    flex-direction : column;
    background-color:#04AA15; 
    border-radius: 20px;
    margin: 20px;
    width: 60%;
`;

export const Text = styled.p`
  margin-bottom: 10px;
  font-size: 40px;
  text-align: center;
  color: #068713;
  font-family: 'Inter', sans-serif;
`;

export const Input = styled.input`
    border-radius: 15px;
    border-color: #F97F33;
    border-width: 5px;
    border-style: solid;
    padding: 13px;
    font-size: 20px;
    width: 166px;
    text-align: center;
`;
    