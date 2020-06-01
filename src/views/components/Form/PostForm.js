import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { required } from 'redux-form-validators';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { createPost } from '../../../state/operations';
import { UserContext, AuthContext, PostsContext, NotificationsContext } from '../../components/App';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useAxios } from 'state/hooks/useAxios';

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

const PostForm = ({ isSubmitting, handleSubmit }) => {
  const { notifications, handleAddNotification } = useContext(NotificationsContext);
  const {
    auth: { current_user },
  } = useContext(AuthContext);

  const { post_id } = useParams();
  const history = useHistory();

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
      if (getPostResponse.status === 0 && post_id) {
        await getPost();
      }
    };

    fetchData();
  }, [getPost, getPostResponse.status, post_id]);
  console.log('put', putPostResponse);
  const [state, setState] = useState({ error: null, progress: -1 });
  const addPost = useCallback(
    async values => {
      const { title, body, postImage } = values;
      let data = new FormData();
      data.append('file', postImage);
      data.append('title', title);
      data.append('body', body);
      try {
        await postPost(data, {
          onUploadProgress: (p) => {
            setState({ ...state, progress: Math.round((p.loaded * 100) / p.total) });
          },
        });
        setState({...state, error: null, progress: -1})
        handleAddNotification({ id: 1, message: 'This is a notification', type: 'success' });
      } catch (error) {
        setState({...state, error, progress: -1})
        console.log(error);
      }
    },
    [handleAddNotification, postPost],
  );

  const editPost = useCallback(
    async values => {
      const { title, body, postImage } = values;

      try {
        await putPost({
          title,
          body,
          file: postImage,
        });

        handleAddNotification({
          id: 2,
          message: 'This is an edited notification',
          type: 'success',
        });
      } catch (error) {
        console.log(error);
      }
    },
    [handleAddNotification, putPost],
  );

  const { status } = postPostResponse;
  const { status: putStatus } = putPostResponse;

  if (status === 1) {
    return <progress value={state.progress} max={100} />
  }

  if (status === 2 || putStatus === 2) {
    const postID = post_id ? post_id : postPostResponse.response.data.id;
    return <Redirect to={`/posts/${postID}`} />;
  }

  const { status: getStatus, response } = getPostResponse;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: post_id && getStatus === 2 ? response.data.title : '',
        body: post_id && getStatus === 2 ? response.data.body : '',
        postImage: post_id && getStatus === 2 ? response.data.image: ''
      }}
      onSubmit={post_id ? editPost : addPost}
    >
      {({ isSubmitting, values }) => (
        <StyledFormWrapper>
          {console.log(values)}
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
          <Field
            name="postImage"
            type="file"
            component={FileUpload}
            placeholder="post image"
            label="Please enter an image"
            setState={setState}
            state={state}
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
