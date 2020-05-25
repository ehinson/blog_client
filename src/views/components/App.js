import React, { createContext, useReducer, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  Link,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { bool } from 'prop-types';

import Registration from '../containers/Registration';
import Login from '../containers/Login';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';
import PrivateRoute from './PrivateRoute';
import { userReducer, authReducer, postsReducer } from '../../state/reducers';
import { initialState } from '../../state';
import { logoutUser } from '../../state/operations';
import { useLocalStorage } from '../../state/hooks/useLocalStorage';
import PostForm from './Form/PostForm';
import UserForm from './Form/UserForm';
import Posts from './Posts/Posts';
import Post from './Posts/Post';
import Users from './Users/Users';
import User from './Users/User';

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
  const [user, userDispatch] = useReducer(userReducer, {
    ...initialState.users,
    ...initialState.user,
  });
  const [posts, postsDispatch] = useReducer(postsReducer, {
    ...initialState.posts,
    ...initialState.post,
  });
  const [auth, authDispatch] = useLocalStorage('auth', authReducer, initialState.auth);
  // users/:id/posts
  const handleLogin = (token, user) =>
    authDispatch({ type: 'login', payload: { authenticated: !!token, token, current_user: user } });
  const handleLogout = () => {
    authDispatch({ type: 'logout', payload: { authenticated: false, token: null } });
  };

  const handleRegister = user => {
    authDispatch({ type: 'current_user', payload: user });
  };
  const handleAddPost = post => postsDispatch({ type: 'createPost', payload: { post } });
  const handleEditPost = post => postsDispatch({ type: 'updatePost', payload: { post } });
  const handleFetchPost = useCallback(
    post => postsDispatch({ type: 'updatePost', payload: { post } }),
    [],
  );
  const handleFetchUser = useCallback(
    user => userDispatch({ type: 'updateUser', payload: { user } }),
    [],
  );
  const handleFetchUserPosts = useCallback(
    posts => userDispatch({ type: 'updateUserPosts', payload: { posts } }),
    [],
  );
  const handleFetchPosts = useCallback(
    posts => postsDispatch({ type: 'updatePosts', payload: { posts } }),
    [],
  );
  const handleFetchUsers = useCallback(
    users => userDispatch({ type: 'updateUsers', payload: { users } }),
    [],
  );

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      <UserContext.Provider value={{ user, handleRegister, handleFetchUser, handleFetchUsers }}>
        <PostsContext.Provider
          value={{
            posts,
            handleAddPost,
            handleEditPost,
            handleFetchPost,
            handleFetchUserPosts,
            handleFetchPosts,
          }}
        >
          <div>
            <GlobalStyle />
            <Router>
              <button type="button" onClick={() => logoutUser(auth, handleLogout)}>
                Logout
              </button>

              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute
                  path="/users/:id/posts/:post_id/:action(add|edit)"
                  component={PostForm}
                />
                <Route path="/users/:id/posts/:post_id" component={Post} />
                <Route path="/users/:id/posts/" component={Posts} />
                <PrivateRoute path="/users/:id/edit" component={UserForm} />
                <Route path="/users/:id/" component={User} />
                <Route exact path="/users/" component={Users} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Router>
          </div>
        </PostsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

App.propTypes = propTypes;

export default App;
