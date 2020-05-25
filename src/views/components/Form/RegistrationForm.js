import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { registerUser } from 'state/operations';
import { UserContext, AuthContext } from 'views/components/App';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import 'core-js';
import 'regenerator-runtime';

import InputField from './InputField';

const propTypes = {};

const StyledFormWrapper = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const StyledButton = styled.button`
  margin: 15px;
  outline: none;
  border: 1px solid #286c81;
  font-size: 0.85em;
  text-transform: uppercase;
  padding: 10px 15px;
`;

/*
Password Regex : https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
^	The password string will start this way
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
*/

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Please choose a username that is at least 3 characters long.')
    .max(36, 'Please choose a username that is fewer than 36 characters long.')
    .required('Required.'),
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(
      8,
      'Password must be at lease 8 characters long, have a lowercase letter, an uppercase letter and a special character.',
    )
    .matches(
      '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/',
      'Password must be at lease 8 characters long, have a lowercase letter, an uppercase letter and a special character.',
    ),
  password2: Yup.string()
    .required('Required')
    .min(
      8,
      'Password must be at lease 8 characters long, have a lowercase letter, an uppercase letter and a special character.',
    )
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const RegistrationForm = ({ isSubmitting, handleSubmit }) => {
  const { user, handleUpdateCurrentUser } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', password2: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          registerUser(values, handleUpdateCurrentUser, history);
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <StyledFormWrapper>
          <Field
            name="username"
            type="text"
            component={InputField}
            placeholder="username"
            label="Please enter a username"
          />
          <Field
            name="email"
            type="email"
            component={InputField}
            placeholder="email"
            label="Please enter a email"
          />
          <Field
            name="password"
            type="password"
            component={InputField}
            placeholder="password"
            label="Please enter a password"
          />
          <Field
            name="password2"
            type="password"
            component={InputField}
            placeholder="password again"
            label="Please enter a password"
          />
          <div>
            <StyledButton type="submit">Submit</StyledButton>
            <StyledButton type="reset">Clear Values</StyledButton>
          </div>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

RegistrationForm.propTypes = propTypes;

export default RegistrationForm;
