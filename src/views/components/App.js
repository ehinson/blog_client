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

import Registration from 'views/pages/Registration';
import Login from 'views/pages/Login';
import Home from 'views/pages/Home';
import NotFound from 'views/pages/NotFound';
import PrivateRoute from './PrivateRoute';
import { userReducer, authReducer, postsReducer } from 'state/reducers';
import { initialState } from 'state';
import { useLocalStorage } from 'state/hooks/useLocalStorage';
import { useAxios } from 'state/hooks/useAxios';
import Post from './Posts/Post';
import Navigation from 'views/components/Navigation/Navigation';
import UserProfile from 'views/pages/UserProfile';
import EditProfile from 'views/pages/EditProfile';
import AddEditPost from 'views/pages/AddEditPost';
import SinglePost from 'views/pages/SinglePost';

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

  console.log(auth, "auth")
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

  // edit Profile
  const handleUpdateCurrentUser = (user) => {
    const item = JSON.parse(window.localStorage.getItem('auth'));
    console.log(item);
    // really need to look at this for reg and login
    if (user) {
      authDispatch({ type: 'current_user', payload: user });
      window.localStorage.setItem(
        'auth',
        JSON.stringify({
          authenticated: !!item.token,
          token: item.token ? item.token : null,
          current_user: user,
          expires: item ? item.expires : null,
        }),
      );
    }
  };



  // const { response: postTokenResponse, request: postToken } = useAxios({
  //   method: 'post',
  //   url: `/tokens`,
  // });

  // export const registerUser = async (values, userDispatch, history) => {
  //   const { username, password, email } = values;

  //   try {
  //     const { data: user } = await axios.post(`/api/users`, {
  //       username,
  //       email,
  //       password,
  //     });
  //     console.log(user);
  //     userDispatch(user); // transform user here

  //     history.push('/login');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


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
                <Route exact path="/" component={Home} />
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path="/posts/:post_id/edit" component={AddEditPost} />
                <PrivateRoute path="/posts/add" component={AddEditPost} />
                <Route path="/posts/:post_id" component={SinglePost} />
                <PrivateRoute path="/users/:id/edit" component={EditProfile} />
                <Route path="/users/:id/" component={UserProfile} />
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
