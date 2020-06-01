import React from 'react';
import PropTypes from 'prop-types';
import UserForm from 'views/components/Form/UserForm';

const EditProfile = props => {
  return (
    <div>
      Edit Profile
      <hr />
      <UserForm />
    </div>
  );
};

EditProfile.propTypes = {};

export default EditProfile;
