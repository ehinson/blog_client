import React, { createContext, useReducer, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { bool } from 'prop-types';

import Registration from '../containers/RegistrationForm';
import PrivateRoute from './PrivateRoute';
import { userReducer } from '../../state/reducers';
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

export const Test = () => {
  return <div>Test</div>;
};

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, initialState.user);
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <>
        <GlobalStyle />
        <Router>
          <Switch>
            <PrivateRoute path="/test" component={Test} />
            <Route path="/">
              <Registration userDispatch={userDispatch} />
            </Route>
          </Switch>
        </Router>
      </>
    </UserContext.Provider>
  );
};

App.propTypes = propTypes;

export default App;
