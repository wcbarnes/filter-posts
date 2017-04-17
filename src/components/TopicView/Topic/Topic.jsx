import React from 'react';
import PropTypes from 'prop-types';

if (process.env.NODE_ENV !== 'test') {
  require('./Topic.scss');
}

/**
 * Represents a single topic inside of the topics view.
 * @constructor
 * @param {boolean} props.following - Whether or not the user is following this topic
 * @param {function} props.onClick - Passed down from TopicView. Updates whether the user is following this Topic or not
 * @param {number} props.id - The id of this topic
 * @param {string} props.name - The name of this topic
 */
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
