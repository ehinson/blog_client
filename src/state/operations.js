import axios from 'axios';
import _ from 'lodash';

export const postUser = async (values, userDispatch, history) => {
  const { username, password, email } = values;

  try {
    const { data } = await axios.post(`/api/users`, {
      username,
      email,
      password,
    });
    console.log(data);
    userDispatch({ type: 'update', payload: data });
    history.push('/test');
  } catch (error) {
    console.log(error);
  }
};
