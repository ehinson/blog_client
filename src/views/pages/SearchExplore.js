import PropTypes from 'prop-types';
import SearchPostForm from '../components/Form/SearchPostForm';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { updateUser } from 'state/operations';
import { UserContext, AuthContext, PostsContext } from 'views/components/App';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
import React, { useContext, useCallback, useState } from 'react';
import { useAxios } from 'state/hooks/useAxios';

const SearchExplore = props => {
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
  const [searchParam, setSearchParam] = useState(null)
  const handleSearch = useCallback(
    async values => {
      console.log(values)
      try {
        setSearchParam(values)
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
    <div>
      Explore      <p>{searchParam && searchParam.search}</p>

      <SearchPostForm handleSearch={handleSearch}/>
          <div>{status === 2 && response.data.items.map(item => <Link to={`/posts/${item.id}`}>{item.title}</Link>)}</div>
    </div>
  );
};

SearchExplore.propTypes = {};

export default SearchExplore;
