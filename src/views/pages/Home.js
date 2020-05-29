import React from 'react';
import PropTypes from 'prop-types';
import { UserContext, AuthContext } from 'views/components/App';
import { useHistory, Link } from 'react-router-dom';

const Home = props => {
  const {
    auth: { current_user },
  } = useContext(AuthContext);
  return (
    <div>
      General and User Home - has all user posts - on current_user posts can edit - maybe merge this
      with Home page
    </div>
  );
};

Home.propTypes = {};

export default Home;
