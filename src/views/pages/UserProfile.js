import PropTypes from 'prop-types';
import React, { useContext, useEffect, useCallback, useState } from 'react';

import { UserContext, AuthContext } from 'views/components/App';
import { useAxios } from 'state/hooks/useAxios';

import { useHistory, Link, useParams } from 'react-router-dom';
import Dangerous from '../components/Dangerous';

const UserProfile = props => {
  const {
    auth: { current_user },
  } = useContext(AuthContext);
  let { id: user_id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
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

  const { response: postFollowResponse, request: postFollow } = useAxios({
    method: 'post',
    url: `/follow/${user_id}`,
    withAuth: true,
  });

  const { response: postUnfollowResponse, request: postUnfollow } = useAxios({
    method: 'post',
    url: `/unfollow/${user_id}`,
    withAuth: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (getUserResponse.status === 0) {
        await getUser();
      }

      if (getUserResponse.status === 2) {
        setIsFollowing(getUserResponse.response.data.is_followed);
        handleAddNotification({ id: 3, message: 'Followed', type: 'success' });
      }
    };
    const fetchPosts = async () => {
      if (getUserPostResponse.status === 0) {
        await getUserPosts();
      }
    };

    fetchUser();
    fetchPosts();
  }, [getUserPosts, getUserPostResponse, getUser, getUserResponse]);

  const handleFollowUnfollow = async () => {
    try {
      if (isFollowing) {
        await postUnfollow();
      } else {
        await postFollow();
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(getUserPostResponse, getUserResponse, isFollowing);
  return (
    <div>
      <button type="button" onClick={handleFollowUnfollow}>
        {isFollowing ? 'Unfollow' : 'follow'}
      </button>
      <img src={getUserResponse?.response?.data?._links.avatar} />
      User Profile: public view/ private view Followers:{' '}
      {getUserResponse?.response?.data?.follower_count}
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
