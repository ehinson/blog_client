import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NotificationsContext } from 'views/components/App';

const Notification = props => {
  const { notifications } = useContext(NotificationsContext);
  return (
    <div>
      Notifications:{' '}
      {notifications.map(not => (
        <div>{not.message}</div>
      ))}
    </div>
  );
};

Notification.propTypes = {};

export default Notification;
