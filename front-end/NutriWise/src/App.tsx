import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/routes/routes';
import GlobalStyles from './styles/GlobalStyles';

function App() {


  return (
    <>
      <GlobalStyles/>
      <Router >
         <Routes />
      </Router>
    </>
    
  )
}

export default App
