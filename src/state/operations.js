import axios from 'axios';
import _ from 'lodash';

export const registerUser = async (values, userDispatch, history) => {
  const { username, password, email } = values;

  try {
    const { data: user } = await axios.post(`/api/users`, {
      username,
      email,
      password,
    });
    console.log(user);
    userDispatch(user); // transform user here

    history.push('/login');
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (values, authDispatch, history) => {
  const { username, password } = values;

  try {
    const {
      data: { token, current_user },
    } = await axios.post(
      `/api/tokens`,
      {},
      {
        auth: {
          username,
          password,
        },
      },
    );
    if (token) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      window.localStorage.setItem(
        'auth',
        JSON.stringify({ authenticated: !!token, token, current_user, expires }),
      );
      authDispatch(token, current_user, expires);
      history.push('/');
    }
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (auth, authDispatch, history) => {
  try {
    const { data } = await axios.delete(`/api/tokens`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const expires = new Date();
    expires.setDate(expires.getDate() - 1);
    window.localStorage.setItem(
      'auth',
      JSON.stringify({ authenticated: false, token: null, expires }),
    );
    authDispatch();
    history.push('/login');
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (values, auth, postsDispatch, history) => {
  try {
    const { data: post } = await axios.post(
      `/api/posts`,
      {
        title: values.title,
        body: values.body,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );
    console.log('data', post);
    postsDispatch(post);
    history.push(`/users/${post.author_id}/posts/${post.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = async (auth, userID, usersDispatch, history) => {
  try {
    const { data: user } = await axios.get(`/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log('user', user);
    usersDispatch(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (values, auth, usersDispatch, authDispatch, history) => {
  const { username, about_me } = values;
  const {
    current_user: { id },
  } = auth;
  try {
    const { data: user } = await axios.put(
      `/api/users/${id}`,
      {
        about_me,
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );
    console.log('user', user);
    usersDispatch(user);
    // TODO: only if user id matches current_user?
    authDispatch(user, auth.token);
    history.push(`/users/${user.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (auth, usersDispatch, history) => {
  try {
    const { data: users } = await axios.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log('users', users);
    usersDispatch(users);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPost = async (auth, postID, postsDispatch, history) => {
  try {
    const { data: post } = await axios.get(`/api/posts/${postID}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log('data', post);
    postsDispatch(post);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = async (auth, postsDispatch, history) => {
  try {
    const { data: post } = await axios.get(`/api/posts`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log('data', post);
    postsDispatch(post);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserPosts = async (auth, userID, usersDispatch, history) => {
  try {
    const { data: posts } = await axios.get(`/api/users/${userID}/posts`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log('data', posts);
    usersDispatch(posts);
  } catch (error) {
    console.log(error);
  }
};
