import React from 'react';
// import { Field } from 'redux-form';
import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { required } from 'redux-form-validators';

import 'core-js';
import 'regenerator-runtime';

import InputField from './InputField';

const propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool.isRequired,
  reset: func.isRequired,
  submitting: bool.isRequired,
  fetchRepos: func.isRequired,
};

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

const RegistrationForm = props => {
  const { handleSubmit, pristine, reset, submitting, fetchRepos } = props;
  return (
    <StyledFormWrapper onSubmit={props => console.log(props)}>
      <Field
        name="username"
        type="text"
        component={InputField}
        placeholder="username"
        label="Please enter a username"
        validate={[required({ msg: 'A username is required.' })]}
      />
      <Field
        name="password"
        type="password"
        component={InputField}
        placeholder="password"
        label="Please enter a password"
        validate={[required({ msg: 'A password is required.' })]}
      />
      <div>
        <StyledButton type="submit" disabled={submitting}>
          Submit API Key
        </StyledButton>
        <StyledButton type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </StyledButton>
      </div>
    </StyledFormWrapper>
  );
};

RegistrationForm.propTypes = propTypes;

export default RegistrationForm;
