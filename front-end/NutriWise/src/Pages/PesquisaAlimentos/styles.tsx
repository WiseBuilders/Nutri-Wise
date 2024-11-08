import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #9FF5A7;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    height: 100vh;
`;

export const Section = styled.div`
  background-color: #b3e5ab;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex:8
`;

export const Title = styled.h2`
  color: #1c8b18;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #1c8b18;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const FoodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FoodItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #a5d6a7;
  padding: 10px;
  border-radius: 5px;
`;

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NutrientContainer = styled.div`
  background-color: #1c8b18;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
`;

export const Button2 = styled.button`
  padding: 5px 10px;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: ${props => (props.ok ? '#ff7043' : '#ffca28')};
`;

export const InfoContainer = styled.div`
    display: flex;
    flex: 4;
    flex-direction: column;
  align-items: center;
`;

export const FoodTypeContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #068713;
  padding: 15px;
  border-radius: 10px;
  align-items: center;

`;