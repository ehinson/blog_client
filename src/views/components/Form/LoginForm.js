import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { loginUser } from 'state/operations';
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

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Please choose a username that is at least 3 characters long.')
    .min(36, 'Please choose a username that is fewer than 36 characters long.')
    .required('Required.'),
  password: Yup.string()
    .required('Required')
    .min(
      8,
      'Password must be at lease 8 characters long, have a lowercase letter, an uppercase letter and a special character.',
    )
    .matches('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/'),
});

const LoginForm = ({ isSubmitting, handleSubmit }) => {
  const { user, userDispatch } = useContext(UserContext);
  const { auth, handleLogin } = useContext(AuthContext);
  const history = useHistory();
  console.log(user);
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          loginUser(values, handleLogin, history);

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
            name="password"
            type="password"
            component={InputField}
            placeholder="password"
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

LoginForm.propTypes = propTypes;

export default LoginForm;
