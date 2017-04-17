import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFollowing } from '../../action-creators/action-creators.jsx';
import Topic from './Topic';

if (process.env.NODE_ENV !== 'test') {
  require('./TopicView.scss');
}

/**
 * Represents a view to show all available Topics to follow.
 * @constructor
 * @param {function} this.props.updateFollowing - Updates the topics that the user is following
 * @param {array} this.props.topicList - A list of all available topics
 * @param {array} this.props.following - A list of the topic id's that the user is following
 */
export class TopicView extends React.Component {
  constructor() {
    super();
    this.updateFollowing = this.updateFollowing.bind(this);
  }

  updateFollowing(id) {
    this.props.updateFollowing(id);
  }

  render() {
    return (
      <div className="topic-view">
        {this.props.topicList.map((topic, i) =>
          <Topic
            name={topic.name}
            id={topic.id}
            key={i}
            following={this.props.following.includes(topic.id)}
            onClick={this.updateFollowing}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topicList: state.get('topicList') ? state.get('topicList').toJS() : [],
    following: state.get('following') ? state.get('following').toJS() : [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateFollowing: topicID => dispatch(updateFollowing(topicID)),
  };
}

TopicView.propTypes = {
  following: PropTypes.array,
  updateFollowing: PropTypes.func,
  topicList: PropTypes.array,
};

export const TopicViewContainer = connect(mapStateToProps, mapDispatchToProps)(TopicView);

