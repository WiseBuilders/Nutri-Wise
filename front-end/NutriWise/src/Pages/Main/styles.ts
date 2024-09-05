import styled from 'styled-components';

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

export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Img = styled.img`
  margin: 20px 0;
  width: 150px;
  height: auto;

  @media (min-width: 768px) {
    width: 200px;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  max-width: 600px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  height: 3em;
  gap: 10px;
  width: 50%;
  justify-content: end;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;