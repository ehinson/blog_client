import React, { createContext, useReducer, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { bool } from 'prop-types';

import Registration from '../containers/Registration';
import Login from '../containers/Login';
import PrivateRoute from './PrivateRoute';
import { userReducer, authReducer, postsReducer } from '../../state/reducers';
import { initialState } from '../../state';
import { useLocalStorage } from '../../state/hooks/useLocalStorage';
import PostForm from './Form/PostForm';
import Posts from './Posts/Posts';
import Post from './Posts/Post';

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
export const PostsContext = createContext();

export const Test = () => {
  return (
    <div>
      Test
      <PostForm />
    </div>
  );
};

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, initialState.user);
  const [posts, postsDispatch] = useReducer(postsReducer, initialState.posts);
  const [auth, authDispatch] = useLocalStorage('auth', authReducer, initialState.auth);
// logout/
login/
users/:id/posts
  const handleSubscribe = () => dispatch({ type: 'subscribeUser', payload: user.name });
  const handleUnSubscribe = () => dispatch({ type: 'unSubscribeUser', payload: user.name });

  return (
    <AuthContext.Provider value={{ auth, authDispatch }}>
      <UserContext.Provider value={{ user, userDispatch }}>
        <PostsContext.Provider value={{ posts, postsDispatch }}>
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
                <Route exact path="/posts/:id" component={Post} />
                <Route exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/" component={Test} />
              </Switch>
            </Router>
          </>
        </PostsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

App.propTypes = propTypes;

export default App;
