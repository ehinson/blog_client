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
    console.log(token);
    authDispatch({ type: 'update', payload: { authenticated: !!token, token } });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
