import React, { createContext, useReducer, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { bool } from 'prop-types';

import Registration from '../containers/RegistrationForm';
import PrivateRoute from './PrivateRoute';
import userReduceer from '../../state/reducers';

const propTypes = {};

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body, html, #root {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    position: relative;
  }
`;

const Context = createContext();

export const Test = () => {
  return <div>Test</div>;
};

const App = () => {
  const [user, userDispatch] = useReducer(userReduceer, { token: null });
  return (
    <Context.Provider value={{ user, userDispatch }}>
      <Context.Consumer>
        {props => (
          <>
            <GlobalStyle />
            <Router>
              <Switch>
                <PrivateRoute path="/test" component={Test} hasToken={user.token} />
                <Route path="/">
                  <Registration />
                </Route>
              </Switch>
            </Router>
          </>
        )}
      </Context.Consumer>
    </Context.Provider>
  );
};

App.propTypes = propTypes;

export default App;
