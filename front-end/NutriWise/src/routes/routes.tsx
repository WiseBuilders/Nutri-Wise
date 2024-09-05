import { Routes as Switch, Route } from 'react-router-dom'
import Main from '../Pages/Main/Index';
import SignUp from '../Pages/SignUp/Index';

const Routes = () => {
  return (
    <Switch>
        <Route path="/" element={<Main />} />
        <Route path="/singup" element={<SignUp />} />
    </Switch>
  );
}

export default Routes;