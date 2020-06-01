import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoginForm from '../components/Form/LoginForm';
import { UserContext, AuthContext } from '../components/App';

const Login = () => {;
  return (
    <div>
      <header>
        <h2>Login</h2>
      </header>
      <LoginForm />
    </div>
  );
};

export default Login;
