import React, { createContext, useReducer, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { bool } from 'prop-types';

import Registration from '../containers/Registration';
import Login from '../containers/Login';
import PrivateRoute from './PrivateRoute';
import { userReducer, authReducer } from '../../state/reducers';
import { initialState } from '../../state';

const propTypes = {};

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body, html, #root {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    position: relative;
  }
`;

export const UserContext = createContext();
export const AuthContext = createContext();

export const Test = () => {
  return <div>Test</div>;
};

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, initialState.user);
  const [auth, authDispatch] = useReducer(authReducer, initialState.auth);

  return (
    <AuthContext.Provider value={{ auth, authDispatch }}>
      <UserContext.Provider value={{ user, userDispatch }}>
        <>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route path="/register">
                <Registration />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute exact path="/" component={Test} />
            </Switch>
          </Router>
        </>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

App.propTypes = propTypes;

export default App;
