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
    userDispatch({ type: 'update', payload: user }); // transform user here

    history.push('/login');
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (values, authDispatch, history) => {
  const { username, password } = values;
  console.log('this is called with: ', values);

  try {
    const {
      data: { token },
    } = await axios.post(`/api/tokens`, {
      auth: {
        username,
        password,
      },
    });
    window.localStorage.setItem('auth', JSON.stringify({ authenticated: !!token, token }));
    authDispatch({ type: 'update', payload: { authenticated: !!token, token } });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (values, auth, history) => {
  console.log('this is called with: ', values, auth);

  try {
    const {
      data: { token },
    } = await axios.post(
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
    // auDispatch({ type: 'update', payload: { authenticated: !!token, token } });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
