import PropTypes from 'prop-types';
import React, { useContext, useEffect, useCallback } from 'react';

import { UserContext, AuthContext } from 'views/components/App';
import { useAxios } from 'state/hooks/useAxios';

import { useHistory, Link, useParams } from 'react-router-dom';

const UserProfile = props => {
  const {
    auth: { current_user },
  } = useContext(AuthContext);
  let { id: user_id } = useParams();
  const { response: getUserPostResponse, request: getUserPosts } = useAxios({
    method: 'get',
    url: `/users/${user_id}/posts`,
    withAuth: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (getUserPostResponse.status === 0) {
        await getUserPosts();
      }
    };

    fetchData();
  }, [getUserPosts, getUserPostResponse]);
  console.log(getUserPostResponse);
  return (
    <div>
      User Profile: public view/ private view
      {current_user && current_user.id === parseInt(user_id) && (
        <Link to={`/users/${user_id}/edit`}>Edit Profile</Link>
      )}
      <hr />
      {getUserPostResponse.status === 2 &&
        getUserPostResponse.response.data.items.map(item => (
          <>
            <div>{item.title}</div>
            <div>{item.body}</div>
            {current_user.id === item.author_id && <Link to={`/posts/${item.id}/edit`}>Edit</Link>}
          </>
        ))}
    </div>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
