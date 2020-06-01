import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import React, { useContext, useCallback } from 'react';
import { AuthContext } from 'views/components/App';
import { useAxios } from 'state/hooks/useAxios';
import { useHistory, Redirect } from 'react-router-dom';
import * as Yup from 'yup';

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
  password: Yup.string()
    .required('Required')
    .min(
      8,
      'Password must be at lease 8 characters long, have a lowercase letter, an uppercase letter and a special character.',
    ),
});

const LoginForm = () => {
  const { handleLogin, auth: { current_user, token, expires } } = useContext(AuthContext);
  const is_anonymous = !current_user || !token || new Date(expires).getTime() <= Date.now();
  const history = useHistory();
  const { response: postTokenResponse, request: postToken } = useAxios({
    method: 'post',
    url: `/tokens`,
  });
  const loginUser = useCallback(
    async values => {
      const { username, password } = values;

      try {
        await postToken(
          {},
          {
            auth: {
              username,
              password,
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    },
    [postToken],
  );
  console.log(postTokenResponse);
  const { status, response } = postTokenResponse;

  if (status === 2 && response.data) {
    const {
      data: { token, current_user },
    } = response;
    if (token) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      window.localStorage.setItem(
        'auth',
        JSON.stringify({ authenticated: !!token, token, current_user, expires }),
      );
      handleLogin(token, current_user, expires);
    }
  }

  if (!is_anonymous|| status === 2) {
    return <Redirect to="/" />;
  }

  if (status === 0) {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={loginUser}
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
              <StyledButton disabled={isSubmitting} type="submit">
                Submit
              </StyledButton>
              <StyledButton disabled={isSubmitting} type="reset">
                Clear Values
              </StyledButton>
            </div>
          </StyledFormWrapper>
        )}
      </Formik>
    );
  }

  if (status === 1) {
    return <div>...Loading</div>;
  }
};

LoginForm.propTypes = propTypes;

export default LoginForm;
