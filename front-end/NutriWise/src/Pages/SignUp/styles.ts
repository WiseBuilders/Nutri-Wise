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
 
export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F97F33;
    border-radius: 18px;
    border: solid 5px #FFFFFF;
    padding: 10px;
    padding-bottom:5em;
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
  font-size: 1rem;
  text-align: center;
  max-width: 600px;
  position: relative;
  top: 13px;
  margin-bottom: 30px;
 
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;
 
export const Input = styled(Field)`
  padding: 10px;
  font-size: 1rem;
  width:87%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
 
export const Select = styled(Field)`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
`;
 
export const ErrorText = styled.div`
    color: red;
    font-size: 0.875rem;
    position: relative;
    top: 10px;
`;
 
export const Text = styled.p`
  font-size: 1.31em;
  font-weight: 600;
  align-items: left;
  position:"relative";
  margin-right:"5em"
  margin-bottom: 15px;
  margin-top: 15px;
  color: #F6F8B0;
 
  p:first-child{
    margin-bottom: 5px
  }
  p:last-child{
    margin-top: 5px;
  }
`;
 
export const Text2 = styled.p`
  font-size: 1.31em;
  font-weight: 600;
  align-items: left;
 
  color: #F6F8B0;
 
  p:first-child{
    margin-bottom: 5px
  }
  p:last-child{
    margin-top: 5px;
  }
`;
 
export const FormWrapper = styled(Formik)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
 
`;
 
export const WeightLenghtContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-evenly;
  gap: 10px;
 
  @media (max-width: 412px) {
    flex-direction: column;
  }
 
`
 