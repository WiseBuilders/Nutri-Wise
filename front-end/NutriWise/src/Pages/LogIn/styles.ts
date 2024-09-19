import { Field, Formik } from "formik";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #00A000;
    padding: 20px;
    box-sizing: border-box;
  
    @media (min-width: 768px) {
        padding: 40px;
    }
`;

export const LogInContainer = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    flex-direction: column;
    padding: 2em;
    border: solid 3px #FFFFFF;
    border-radius: 30px;
    width: 560px;

    @media (min-width: 400px) {
        width: 400px;
        border: solid 3px #FFFFFF;
    }
`;

export const Img = styled.img`
  width: 70px;

  @media (min-width: 768px) {
    width: 70px;
  }
`;

export const TittleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 45px;

`;

export const TittleText = styled.h1`
    font-size: 30px;
`;

export const Input = styled(Field)`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const ErrorText = styled.div`
    color: red;
    font-size: 0.875rem;
`;

export const FormWrapper = styled(Formik)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
    color: #ffffff;
    margin-bottom: 5px;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const Link = styled.a`
    color: #ffffff;
    margin-bottom: 10px;
    margin-bottom: 10px;
`;
