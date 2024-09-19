import { Field, Formik } from "formik";
import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #0EC320;
    padding: 20px;
    box-sizing: border-box;
  
    @media (min-width: 768px) {
        padding: 40px;
    }
`;

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F97F33;
    border-radius: 10px;
    border: solid 5px #FFFFFF;
    padding: 25px;
    padding-bottom: 2.5%;
`;

export const Img = styled.img`
    margin: 20px 0;
    width: 95px;
    height: auto;

    @media (min-width: 768px) {
        width: 95x;
    }
`;

export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Description = styled.p`
  font-size: 0.25rem;
  text-align: center;
  max-width: 550px;
  padding-top: 12px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 1.15rem;
  }
`;

export const Input = styled(Field)`
  padding: 10px;
  font-size: 1rem;
  width: 85%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Select = styled(Field)`
  padding: 10px;
  font-size: 1rem;
  width: 50%;
  border-radius: 5px;
  align-items: left;
  border: 1px solid #ccc;
  background-color: white;
`;

export const ErrorText = styled.div`
    color: black;
    font-size: 0.875rem;
`;

export const Text = styled.p`
  font-size: 1.31em;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #F6F8B0;
  
  p:first-child{
    margin-bottom: 5px;

  }
  p:last-child{
    margin-top: 5px;
  }
`;

export const Texto = styled.text`
  margin-left: 15%;
  display: flex;
  flex-direction: column;
  width: 35em;
`;

export const Peso = styled.text`
  margin-left: 15%;
  display: flex;
  flex-direction: column;
  width: 35em;
`;

export const Sexo = styled.text`
text-align: left;
margin-left: 35%;
display: flex;
flex-direction: column;
width: 25em;
`


export const FormWrapper = styled(Formik)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WeightLenghtContainer = styled.div`
  display: flex;
  width: 111%;
  margin-top: 7px;
  margin-left: 5%;
  justify-content: space-evenly;
  gap: 10px;

  @media (max-width: 412px) {
    flex-direction: column;
  }
  
`
