import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { required } from 'redux-form-validators';
import React, { useContext, useCallback, useEffect } from 'react';
import { createPost } from '../../../state/operations';
import { UserContext, AuthContext, PostsContext } from '../../components/App';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useAxios } from 'state/hooks/useAxios';

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
  const { posts, handleAddPost } = useContext(PostsContext);
  const { post_id } = useParams();
  const history = useHistory();
  const {
    auth: { current_user },
  } = useContext(AuthContext);
  const { response: postPostResponse, request: postPost } = useAxios({
    method: 'post',
    url: `/posts`,
    withAuth: true,
  });
  const { response: putPostResponse, request: putPost } = useAxios({
    method: 'put',
    url: `/posts/${post_id}`,
    withAuth: true,
  });

  const { response: getPostResponse, request: getPost } = useAxios({
    method: 'get',
    url: `/posts/${post_id}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (getPostResponse.status === 0) {
        await getPost();
      }
    };

    fetchData();
  }, [getPost, getPostResponse]);
  console.log('put', putPostResponse);

  const addPost = useCallback(
    async values => {
      const { title, body } = values;

      try {
        await postPost({
          title,
          body,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [postPost],
  );

  const editPost = useCallback(
    async values => {
      const { title, body } = values;

      try {
        await putPost({
          title,
          body,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [putPost],
  );

  const { status } = postPostResponse;
  const { status: putStatus } = putPostResponse;


  if (status === 1) {
    return <div>...Loading</div>;
  }

  if (status === 2 || putStatus === 2) {
    const postID = post_id ? post_id: postPostResponse.data.id;
    return <Redirect to={`/posts/${postID}`} />;
  }

  const {
    status: getStatus,
    response,
  } = getPostResponse;

  return (
    <Formik
     enableReinitialize
      initialValues={{
        title: (post_id && getStatus === 2) ? response.data.title : '',
        body: (post_id && getStatus === 2) ? response.data.body : '',
      }}
      onSubmit={post_id ? editPost : addPost}
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
