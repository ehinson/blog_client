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
import PrivateRoute from './PrivateRoute';
import { userReducer, authReducer, postsReducer } from '../../state/reducers';
import { initialState } from '../../state';
import { logoutUser } from '../../state/operations';
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

export const User = () => {
  return <div>User</div>;
};

export const Users = () => {
  let { url } = useRouteMatch();
  let { id } = useParams();
  return (
    <div>
      Users
      {console.log(url, id)}
    </div>
  );
};

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, initialState.user);
  const [posts, postsDispatch] = useReducer(postsReducer, {
    ...initialState.posts,
    ...initialState.post,
  });
  const [auth, authDispatch] = useLocalStorage('auth', authReducer, initialState.auth);
  // logout/
  // login/
  // users/:id/posts
  const handleLogin = token =>
    authDispatch({ type: 'login', payload: { authenticated: !!token, token } });
  const handleLogout = () => {
    authDispatch({ type: 'logout', payload: { authenticated: false, token: null } });
  };

  const handleRegister = user => userDispatch({ type: 'register', payload: user });
  const handleAddPost = post => postsDispatch({ type: 'createPost', payload: { post } });
  const handleEditPost = post => postsDispatch({ type: 'updatePost', payload: { post } });
  const handleFetchPost = useCallback(
    post => postsDispatch({ type: 'updatePost', payload: { post } }),
    [],
  );
  const handleFetchUserPosts = posts => postsDispatch({ type: 'updatePosts', payload: { posts } });
  const handleFetchPosts = posts => postsDispatch({ type: 'updatePosts', payload: { posts } });

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      <UserContext.Provider value={{ user, handleRegister }}>
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
                <Route exact path="/" component={Test} />
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route exact path="/users/" component={Users} />
                <Route path="/users/:id/" component={User} />
                <Route path="/users/:id/posts/" component={Posts} />
                <Route path="/users/:id/posts/:post_id" component={Post} />
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
