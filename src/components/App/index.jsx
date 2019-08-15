import React, { useGlobal, useEffect, useContext } from 'reactn';
import { Helmet } from 'react-helmet';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import Login from 'components/Login';
import Chatroom from 'components/Chatroom';
import Signup from 'components/Signup';
import Home from 'components/Home';
import ChatGUI from 'components/ChatGUI';
import RedirectIfLoggedIn from 'components/Auth/RedirectIfLoggedIn';
import RequireAuth from 'components/Auth/RequireAuth';
import { Routes } from 'utils/constants';

const App = () => (
  <>
    <Helmet>
      <title>IOTA - WebRTC</title>
      <meta name="description" content="A decentralized chat and video call application" />
      <meta charSet="utf-8" />
    </Helmet>
    <Switch>
      <Route exact path={Routes.HOME} component={RequireAuth(Home)} />
      <Route exact path={Routes.LOGIN} component={RedirectIfLoggedIn(Login)} />
      <Route exact path={Routes.SIGNUP} component={RedirectIfLoggedIn(Signup)} />
      <Route exact path={Routes.CHATROOM} component={RequireAuth(Chatroom)} />
      <Route exact path={Routes.CHATGUI} component={ChatGUI} />
      <Redirect to={Routes.HOME} />
    </Switch>
  </>
);

export default App;
