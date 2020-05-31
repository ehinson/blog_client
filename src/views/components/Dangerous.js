import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

const Dangerous = ({ data }) => {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(data, {
          allowedTags: ['b', 'i', 'em', 'strong', 'a'],
          allowedAttributes: {
            a: ['href', 'target'],
          },
        }),
      }}
    />
  );
};

Dangerous.propTypes = {};

export default Dangerous;
