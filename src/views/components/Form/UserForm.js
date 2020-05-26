import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { required } from 'redux-form-validators';
import React, { useContext } from 'react';
import { updateUser } from 'state/operations';
import { UserContext, AuthContext, PostsContext } from 'views/containers/App';
import { useHistory, useParams } from 'react-router-dom';

import 'core-js';
import 'regenerator-runtime';

import InputField from './InputField';
import TextAreaField from './TextAreaField';

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

const UserForm = ({ isSubmitting, handleSubmit }) => {
  const { user, handleEditUser } = useContext(UserContext);
  const { auth, handleUpdateCurrentUser } = useContext(AuthContext);
  const { posts, handleAddPost } = useContext(PostsContext);
  const history = useHistory();
  //   const {
  //     user: { id: user_id },
  //   } = user;
  return (
    <Formik
      initialValues={{
        username: auth?.current_user?.username || '',
        about_me: auth?.current_user?.about_me || '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateUser(values, auth, handleEditUser, handleUpdateCurrentUser, history);
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
            name="about_me"
            type="textarea"
            component={TextAreaField}
            placeholder="about_me"
            label="What about you?"
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

UserForm.propTypes = propTypes;

export default UserForm;
