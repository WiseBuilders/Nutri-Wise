import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/routes/routes';
import GlobalStyles from './styles/GlobalStyles';
import { SignInProvider } from './context/SignInContext';
import { LogInProvider } from './context/LogInContext';
import { PesoProvider } from './context/PesoContext';

function App() {


  return (
    <>
      <GlobalStyles/>
      <SignInProvider>
        <LogInProvider>
          <PesoProvider>
            <Router >
              <Routes />
            </Router>
          </PesoProvider>
        </LogInProvider>
      </SignInProvider>
    </>
    
  )
}

export default App
