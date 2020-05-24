import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoginForm from '../components/Form/LoginForm';
import { UserContext, AuthContext } from '../components/App';

const Login = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);
  console.log(user, auth);
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
