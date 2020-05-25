import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RegistrationForm from '../components/Form/RegistrationForm';
import { UserContext, AuthContext } from '../components/App';
import { useHistory } from 'react-router-dom';

const Registration = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);
  console.log(user, auth);
  return (
    <div>
      <h1>Register</h1>
      <RegistrationForm />
    </div>
  );
};

export default Registration;