import { Field, Formik } from 'formik';
import styled from 'styled-components';


export const ErrorText = styled.div`
    color: red;
    font-size: 1rem;
    bottom: 30px;
`;

export const Label = styled.label`
    color: #068713;
    font-weight: 600;
    bottom: 40px;
    margin-bottom: 10px;
`;
 
export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 17px;
    align-items: center
`;

export const FormWrapper = styled(Formik)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled(Field)`
  padding: 15px;
  bottom: 40px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
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

export const FormContainer = styled.div`
    flex: 6;
`;

export const Text = styled.p`
margin-bottom: 10px;
font-size: 40px;
  text-align: center;
  color: #068713;
  font-family: 'Inter', sans-serif;
`;

export const Container = styled.div`
    background-color: #9FF5A7;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    height: 75vh;
    justify-content: space-around;
`;
 