import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

const _Post = ({ item }) => {
  return (
    <>
      <h5>{item.title}</h5>
      <p
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(item.body, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a'],
            allowedAttributes: {
              a: ['href', 'target'],
            },
          }),
        }}
      />
    </>
  );
};

_Post.propTypes = {};

export default _Post;
