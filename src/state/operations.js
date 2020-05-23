import axios from 'axios';
import _ from 'lodash';

export const postUser = async values => {
  const { username, password, email } = values;
  try {
    const { data } = await axios.post(`/api/users`, {
      username,
      email,
      password,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
