import React from 'react';
// import { Field } from 'redux-form';
import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { required } from 'redux-form-validators';

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
  return (
    <StyledFormWrapper>
      <Field
        name="username"
        type="text"
        component={InputField}
        placeholder="username"
        label="Please enter a username"
        validate={[required({ msg: 'A username is required.' })]}
      />
      <Field
        name="email"
        type="email"
        component={InputField}
        placeholder="email"
        label="Please enter a email"
        validate={[required({ msg: 'An email is required.' })]}
      />
      <Field
        name="password"
        type="password"
        component={InputField}
        placeholder="password"
        label="Please enter a password"
        validate={[required({ msg: 'A password is required.' })]}
      />
      <Field
        name="password2"
        type="password"
        component={InputField}
        placeholder="password again"
        label="Please enter a password"
        validate={[required({ msg: 'A password is required.' })]}
      />
      <div>
        <StyledButton type="submit">Submit</StyledButton>
        <StyledButton type="reset">Clear Values</StyledButton>
      </div>
    </StyledFormWrapper>
  );
};

RegistrationForm.propTypes = propTypes;

export default RegistrationForm;
