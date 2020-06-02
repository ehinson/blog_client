import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { updateUser } from 'state/operations';
import { UserContext, AuthContext, PostsContext, NotificationsContext } from 'views/components/App';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useAxios } from 'state/hooks/useAxios';
import * as Yup from 'yup';

import InputField from './InputField';
import TextAreaField from './TextAreaField';
import FileUpload from './FileUpload';

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
  const { notifications, handleAddNotification } = useContext(NotificationsContext);

  const {
    handleUpdateCurrentUser,
    auth: { current_user },
  } = useContext(AuthContext);
  const history = useHistory();
  const { id: user_id } = useParams();
  const { response: putUserResponse, request: putUser } = useAxios({
    method: 'put',
    url: `/users/${user_id}`,
    withAuth: true,
  });

  const [state, setState] = useState({ error: null, progress: -1 });

  const editUser = useCallback(
    async values => {
      const { username, about_me, userImage } = values;
      console.log(state);
      debugger;
      let filename = '';

      let data = new FormData();
      if (userImage.name) {
        data.append('file', userImage);
        filename = userImage.name;
      } else {
        data.append('filename', userImage);
        filename = userImage;
      }
      data.append('about_me', about_me);
      data.append('username', username);

      try {
        await putUser(data, {
          onUploadProgress: p => {
            setState({ ...state, progress: Math.round((p.loaded * 100) / p.total) });
          },
        });
        await setState({ ...state, error: null, progress: -1 });
        await handleUpdateCurrentUser({
          ...current_user,
          about_me,
          image: filename,
          username,
        });
        debugger;
        await handleAddNotification({
          id: 5,
          message: 'This is an edited user notification',
          type: 'success',
        });
        await history.push(`/users/${user_id}`);
      } catch (error) {
        console.log(error);
        handleAddNotification({
          id: 6,
          message: 'This is an edited user error notification',
          type: 'error',
        });
      }
    },
    [
      current_user,
      handleAddNotification,
      handleUpdateCurrentUser,
      history,
      putUser,
      state,
      user_id,
    ],
  );

  const { status, response } = putUserResponse;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: current_user?.username || '',
        about_me: current_user?.about_me || '',
        userImage: current_user?.image || '',
      }}
      onSubmit={editUser}
    >
      {({ isSubmitting }) => (
        <StyledFormWrapper>
          {status === 1 && <progress value={state.progress} max={100} />}

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
          <Field
            name="userImage"
            type="file"
            component={FileUpload}
            placeholder="user image"
            label="Please enter an image"
            setState={setState}
            state={state}
            isEdit={!!user_id}
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
