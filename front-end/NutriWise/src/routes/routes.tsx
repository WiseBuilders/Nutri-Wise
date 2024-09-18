import { Routes as Switch, Route } from 'react-router-dom'
import Main from '../Pages/Main/Index';
import SignUp from '../Pages/SignUp/Index';
import LogIn from '../Pages/LogIn/Index';

const Routes = () => {
  return (
    <Switch>
        <Route path="/" element={<Main />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
    </Switch>
  );
}

export default Routes;