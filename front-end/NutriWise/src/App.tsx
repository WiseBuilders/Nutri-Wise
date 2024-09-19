import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/routes/routes';
import GlobalStyles from './styles/GlobalStyles';
import { SignInProvider } from './context/SignInContext';
import { LogInProvider } from './context/LogInContext';

function App() {


  return (
    <>
      <GlobalStyles/>
      <SignInProvider>
        <LogInProvider>
          <Router >
            <Routes />
          </Router>
        </LogInProvider>
      </SignInProvider>
    </>
    
  )
}

export default App
