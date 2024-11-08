import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/routes/routes';
import GlobalStyles from './styles/GlobalStyles';
import { SignInProvider } from './context/SignInContext';
import { LogInProvider } from './context/LogInContext';
import { PesoProvider } from './context/PesoContext';
import { AlimentosProvider } from './context/AlimentosContext';

function App() {


  return (
    <>
      <GlobalStyles/>
      <SignInProvider>
        <LogInProvider>
          <PesoProvider>
            <AlimentosProvider>
            <Router >
              <Routes />
            </Router>
            </AlimentosProvider>
          </PesoProvider>
        </LogInProvider>
      </SignInProvider>
    </>
    
  )
}

export default App
