import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { required } from 'redux-form-validators';
import React, { useContext } from 'react';
import { registerUser } from '../../../state/operations';
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

const RegistrationForm = ({ isSubmitting, handleSubmit }) => {
  const { user, handleUpdateCurrentUser } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', password2: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
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
