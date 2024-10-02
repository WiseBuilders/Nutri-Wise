import { Field, Formik } from "formik";
import styled from "styled-components";
 
 
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: px;
 
 
 
    box-sizing: border-box;
 
    @media (min-width: 768px) {
        padding: 0px;
 
    }
`;
 
export const OuterContainer = styled.div`
  background-color: #0EC320;
  background: cover;
 
  @media (min-width: 768px) {
    background-color: #0EC320;
     background: cover;
  }
`;
 
export const LogInContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex: 1;
    flex-direction: column;
    padding: 4em;
    padding-top: 11em;
    border: solid 5px #FFFFFF;
    position: relative;
    top: 8em;
    background-color: #0EC320;
    border-radius: 30px;
    width: 100%;
 
 
    @media (min-width: 400px) {
        width: 100%;
        border: solid 5px #FFFFFF;
 
    }
`;
 
export const Img = styled.img`
  width: 100px;
  align-items: center;
  border: solid 3px #3EEB4F;
  border-radius: 15px;
  position: relative;
  bottom: 160px;
 
  @media (min-width: 768px) {
    width: 80px;
    position: relative;
    bottom: 160px;
    align-items: center;
  }
`;
 
export const TittleContainer = styled.div`
    display:flex;
    position: relative;
    bottom:20px;
`;
 
export const TittleText = styled.h1`
    font-size: 35px;
`;
 
export const Input = styled(Field)`
  padding: 15px;
  width: 200%;
  position: relative;
  bottom: 40px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
`;
 
export const ErrorText = styled.div`
    color: red;
    font-size: 1rem;
    position: relative;
    bottom: 30px;
`;
 
export const FormWrapper = styled(Formik)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
 
export const Label = styled.label`
    color: #ffffff;
    position: relative;
    bottom: 40px;
    margin-bottom: 10px;
`;
 
export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 17px;
`;
 
export const Link = styled.a`
    color: #ffffff;
    margin-bottom: 80px;
`;