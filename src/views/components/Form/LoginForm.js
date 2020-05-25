import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { loginUser } from '../../../state/operations';
import { UserContext, AuthContext } from '../../components/App';
import { useHistory } from 'react-router-dom';

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

const LoginForm = ({ isSubmitting, handleSubmit }) => {
  const { user, userDispatch } = useContext(UserContext);
  const { auth, handleLogin } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
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