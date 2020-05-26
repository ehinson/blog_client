import React, { createContext, useReducer, useCallback } from 'react';
import { bool } from 'prop-types';

import { userReducer, authReducer, postsReducer } from 'state/reducers';
import { initialState } from 'state';
import { useLocalStorage } from 'state/hooks/useLocalStorage';
import AppComponent from 'views/components/App';

const propTypes = {};

export const UserContext = createContext();
export const AuthContext = createContext();
export const PostsContext = createContext();
export const NotificationsContext = createContext();

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
          <NotificationsContext.Provider>
            <AppComponent />
          </NotificationsContext.Provider>
        </PostsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

App.propTypes = propTypes;

export default App;
