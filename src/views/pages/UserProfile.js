import PropTypes from 'prop-types';
import React, { useContext, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

import { UserContext, AuthContext, NotificationsContext } from 'views/components/App';
import { useAxios } from 'state/hooks/useAxios';

import { useHistory, Link, useParams } from 'react-router-dom';
import Dangerous from '../components/Dangerous';

const ImagePreview = styled.img`
  max-width: 200px;
  height: auto;
`;

const UserProfile = props => {
  const {
    auth: { current_user },
  } = useContext(AuthContext);
  const { notifications, handleAddNotification } = useContext(NotificationsContext);

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

      if (
        getUserResponse.status === 2 &&
        postFollowResponse.status === 0 &&
        postUnfollowResponse.status === 0
      ) {
        setIsFollowing(getUserResponse.response.data.is_followed);
      }
    };
    const fetchPosts = async () => {
      if (getUserPostResponse.status === 0) {
        await getUserPosts();
      }
    };

    fetchUser();
    fetchPosts();
  }, [
    getUserPosts,
    getUserPostResponse,
    getUser,
    getUserResponse,
    postFollowResponse.status,
    postUnfollowResponse.status,
  ]);

  const handleFollowUnfollow = async () => {
    try {
      if (isFollowing) {
        await postUnfollow();
        await setIsFollowing(false);
      } else {
        await postFollow();
        await setIsFollowing(true);
      }

      handleAddNotification({ id: 3, message: 'Followed/Unfollowed', type: 'success' });
    } catch (error) {
      console.log(error);
      handleAddNotification({ id: 4, message: 'Error', type: 'error' });
    }
  };
  console.log(getUserPostResponse, getUserResponse, isFollowing);

  let imageSrc = null;

  if (getUserResponse?.response?.data?.image) {
    let img = require(`images/${getUserResponse.response.data.image}`);
    imageSrc = img ? img.default : null;
  }
  return (
    <div>
      {current_user && current_user.id !== parseInt(user_id, 10) && (
        <button type="button" onClick={handleFollowUnfollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
      <div>
        {imageSrc && <ImagePreview src={imageSrc} alt={getUserResponse.response.data.title} />}
      </div>
      User Profile: public view/ private view <br />
      {/* need to update this from postFollower response if we have it */}
      Followers:
      {getUserResponse?.response?.data?.follower_count}
      Following: {getUserResponse?.response?.data?.followed_count}
      Last Seen: {getUserResponse?.response?.data?.last_seen}
      {current_user && current_user.id === parseInt(user_id, 10) && (
        <Link to={`/users/${user_id}/edit`}>Edit Profile</Link>
      )}
      <hr />
      {getUserPostResponse.status === 2 &&
        getUserPostResponse.response.data.items.map(item => (
          <section key={item.id}>
            <div>{item.title}</div>
            <div>
              <Dangerous data={item.body} />
            </div>
            {current_user && current_user.id === item.author_id && (
              <Link to={`/posts/${item.id}/edit`}>Edit</Link>
            )}
          </section>
        ))}
    </div>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
