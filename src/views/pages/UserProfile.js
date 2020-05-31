import PropTypes from 'prop-types';
import React, { useContext, useEffect, useCallback } from 'react';

import { UserContext, AuthContext } from 'views/components/App';
import { useAxios } from 'state/hooks/useAxios';

import { useHistory, Link, useParams } from 'react-router-dom';
import Dangerous from '../components/Dangerous';

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
  const { response: getUserResponse, request: getUser } = useAxios({
    method: 'get',
    url: `/users/${user_id}`,
    withAuth: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (getUserResponse.status === 0) {
        await getUser();
      }
    };
    const fetchPosts = async () => {
      if (getUserPostResponse.status === 0) {
        await getUserPosts();
      }
    };
    
    fetchUser();
    fetchPosts()
  }, [getUserPosts, getUserPostResponse, getUser, getUserResponse]);
  console.log(getUserPostResponse, getUserResponse);
  return (
    <div>
      <img src={getUserResponse?.response?.data?._links.avatar} />
      User Profile: public view/ private view
      Followers: {getUserResponse?.response?.data?.follower_count}
      Following: {getUserResponse?.response?.data?.followed_count}
      Last Seen: {getUserResponse?.response?.data?.last_seen}
      {current_user && current_user.id === parseInt(user_id) && (
        <Link to={`/users/${user_id}/edit`}>Edit Profile</Link>
      )}
      <hr />
      {getUserPostResponse.status === 2 &&
        getUserPostResponse.response.data.items.map(item => (
          <>
            <div>{item.title}</div>
            <div>
              <Dangerous data={item.body} />
            </div>
            {current_user.id === item.author_id && <Link to={`/posts/${item.id}/edit`}>Edit</Link>}
          </>
        ))}
    </div>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
