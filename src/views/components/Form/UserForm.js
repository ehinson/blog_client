import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { updateUser } from 'state/operations';
import { UserContext, AuthContext, PostsContext } from 'views/components/App';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import React, { useContext, useCallback } from 'react';
import { useAxios } from 'state/hooks/useAxios';
import * as Yup from 'yup';

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
  const { posts, handleAddPost } = useContext(PostsContext);
  const {
    handleUpdateCurrentUser,
    auth: { current_user },
  } = useContext(AuthContext);
  const history = useHistory();
  const {id: user_id}  = useParams()
  const { response: putUserResponse, request: putUser } = useAxios({
    method: 'put',
    url: `/users/${user_id}`,
    withAuth: true
  });
  const editUser = useCallback(
    async values => {
      const { username, about_me } = values;

      try {
        await putUser(
          {username, about_me},
        );
      } catch (error) {
        console.log(error);
      }
    },
    [putUser],
  );
  console.log(putUserResponse);
  const { status, response } = putUserResponse;

  if (status === 2 && response.data) {
    handleUpdateCurrentUser(response.data)
    return <Redirect to={`/users/${user_id}`}/>
  }
  return (
    <Formik
      initialValues={{
        username: current_user?.username || '',
        about_me: current_user?.about_me || '',
      }}
      onSubmit={editUser}
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
