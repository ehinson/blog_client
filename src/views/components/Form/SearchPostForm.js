import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { updateUser } from 'state/operations';
import { UserContext, AuthContext, PostsContext } from 'views/components/App';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
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

const SearchPostForm = ({ isSubmitting, handleSubmit }) => {
  const { user, handleEditUser } = useContext(UserContext);
  const { posts, handleAddPost } = useContext(PostsContext);
  const {
    handleUpdateCurrentUser,
    auth: { current_user },
  } = useContext(AuthContext);
  const history = useHistory();
  const { id: user_id } = useParams();
  const { response: searchPostsResponse, request: searchPosts } = useAxios({
    method: 'get',
    url: `/search`,
    withAuth: true,
  });
  const search = useCallback(
    async values => {
      try {
        await searchPosts(
          {},
          {
            params: {
              q: values.search,
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    },
    [searchPosts],
  );
  console.log(searchPostsResponse);
  const { status, response } = searchPostsResponse;

  return (
    <Formik
      initialValues={{
        username: current_user?.username || '',
      }}
      onSubmit={search}
    >
      {({ isSubmitting, values }) => (
        <StyledFormWrapper>
          <Field
            name="search"
            type="text"
            component={InputField}
            placeholder="search"
            label="Search..."
          />
          <div>
            <StyledButton type="submit">Search</StyledButton>
            <StyledButton type="reset">Reset</StyledButton>
          </div>
          <p>{values.search}</p>
          <div>{status === 2 && response.data.items.map(item => <Link to={`/posts/${item.id}`}>{item.title}</Link>)}</div>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

SearchPostForm.propTypes = propTypes;

export default SearchPostForm;
