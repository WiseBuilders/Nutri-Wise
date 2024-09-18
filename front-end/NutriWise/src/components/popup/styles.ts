import { keyframes, styled } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
`;


export const PopupContainer = styled.div<{ type: 'success' | 'error'; isVisible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) => (type === 'success' ? 'green' : 'red')};
  color: white;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s ease;
  transition: opacity 0.5s ease;
`;