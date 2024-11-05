import { createGlobalStyle } from 'styled-components';



const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'); 
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    
  }

  p{
    font-weight: 500;
    font-size: 26px;
    color: #ffffff;
  }
  h1{
    color: #ffffff;
    font-size: 42px;
  }
`;

export default GlobalStyles;