import React, { createContext, useReducer, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  Link,
  NavLink,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { bool } from 'prop-types';

import Registration from 'views/containers/Registration';
import Login from 'views/containers/Login';
import Home from 'views/containers/Home';
import NotFound from 'views/containers/NotFound';
import PrivateRoute from './PrivateRoute';
import { userReducer, authReducer, postsReducer } from 'state/reducers';
import { initialState } from 'state';
import { useLocalStorage } from 'state/hooks/useLocalStorage';
import PostForm from './Form/PostForm';
import UserForm from './Form/UserForm';
import Posts from './Posts/Posts';
import Post from './Posts/Post';
import Users from './Users/Users';
import User from './Users/User';
import Navigation from 'views/components/Navigation/Navigation';

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
  const handleLogin = (token, user, expires) =>
    authDispatch({
      type: 'login',
      payload: { authenticated: !!token, token, current_user: user, expires },
    });
  const handleLogout = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() - 1);
    authDispatch({ type: 'logout', payload: { authenticated: false, token: null, expires } });
  };

  const handleUpdateCurrentUser = (user, token) => {
    const item = JSON.parse(window.localStorage.getItem('auth'));
    console.log(item);
    authDispatch({ type: 'current_user', payload: user });
    window.localStorage.setItem(
      'auth',
      JSON.stringify({ authenticated: !!token, token, current_user: user, expires: item.expires }),
    );
  };
  const handleAddPost = post => postsDispatch({ type: 'createPost', payload: { post } });
  const handleEditPost = post => postsDispatch({ type: 'updatePost', payload: { post } });
  const handleAddUser = user => userDispatch({ type: 'createUser', payload: { user } });
  const handleEditUser = user => userDispatch({ type: 'updateUser', payload: { user } });
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
    users => userDispatch({ type: 'setUsers', payload: { users } }),
    [],
  );

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout, handleUpdateCurrentUser }}>
      <UserContext.Provider
        value={{
          user,
          handleUpdateCurrentUser,
          handleFetchUser,
          handleFetchUsers,
          handleAddUser,
          handleEditUser,
        }}
      >
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
              <Navigation />

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
