import { useEffect, useState } from "react";
import { PopupContainer } from "./styles";

interface PopupProps {
    message: string;
    type: 'success' | 'error'; // Define se é um sucesso ou erro
}
  

const Popup: React.FC<PopupProps> = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // O popup desaparece após 3 segundos
        const timer = setTimeout(() => {
          setIsVisible(false); // Após 3 segundos, oculta o popup
        }, 3000);
        return () => clearTimeout(timer); // Limpa o timeout ao desmontar o componente
    }, []);
  
    return (
      <PopupContainer type={type} isVisible={isVisible}>
        {message}
      </PopupContainer>
    );
  };
  
  export default Popup;