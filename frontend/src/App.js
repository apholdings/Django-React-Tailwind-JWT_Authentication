import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './hocs/Layout'

import Home from './containers/pages/Home'

import Login from './containers/auth/Login';
import Signup from './containers/auth/Signup';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Google from './containers/auth/Google';
import Facebook from './containers/auth/Facebook';


import Error404 from './containers/errors/Error404'

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
       <Layout>
         <Switch>
          <Route exact path='/' component={Home} />

          {/* Authentication */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/google' component={Google} />
          <Route exact path='/facebook' component={Facebook} />
          <Route exact path='/activate/:uid/:token' component={Activate} />
          <Route exact path='/reset_password' component={ResetPassword} />
          <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />


          {/* Error Display */}
          <Route path="/" component={Error404}/>
         </Switch>
       </Layout>
      </Router>
    </Provider>
  );
}

export default App;
