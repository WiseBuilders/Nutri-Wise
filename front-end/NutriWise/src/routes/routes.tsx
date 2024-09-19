import { Routes as Switch, Route } from 'react-router-dom'
import Main from '../Pages/Main/Index';
import SignUp from '../Pages/SignUp/Index';
import LogIn from '../Pages/LogIn/Index';
import Dashboard from '../Pages/Dashboard/Index';

const Routes = () => {
  return (
    <Switch>
        <Route path="/" element={<Main />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Switch>
  );
}

export default Routes;