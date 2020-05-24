import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { required } from 'redux-form-validators';
import React, { useContext } from 'react';
import { createPost } from '../../../state/operations';
import { UserContext, AuthContext, PostsContext } from '../../components/App';
import { useHistory } from 'react-router-dom';

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

const PostForm = ({ isSubmitting, handleSubmit }) => {
  const { user, userDispatch } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);
  const { posts, postsDispatch } = useContext(PostsContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{ title: '', body: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          createPost(values, auth, postsDispatch, history);
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <StyledFormWrapper>
          <Field
            name="title"
            type="text"
            component={InputField}
            placeholder="title"
            label="Please enter a username"
          />
          <Field
            name="body"
            type="textarea"
            component={TextAreaField}
            placeholder="body"
            label="Please enter a email"
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

PostForm.propTypes = propTypes;

export default PostForm;
