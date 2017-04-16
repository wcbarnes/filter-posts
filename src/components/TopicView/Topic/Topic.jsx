import React from 'react';
import PropTypes from 'prop-types';

import './Topic.scss';

const Topic = props =>
  <div className={props.following ? 'topic following-order' : 'topic not-following-order'}>
    <button
      className={props.following ? 'following' : 'not-following'}
      onClick={() => props.onClick(props.id)}
    >
      {props.name}
    </button>
  </div>;
Topic.propTypes = {
  following: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.number,
  name: PropTypes.string,
};

export default Topic;
