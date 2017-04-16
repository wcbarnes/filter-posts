import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getArticles } from '../../action-creators/action-creators.jsx';
import ArticleContainer from '../Article';

import './Home.scss';

/**
 * Represents the homepage and feed.
 * @constructor
 * @param {function} this.props.getArticles - Gets all articles from topics the user is following
 * @param {array} this.props.articleList - A list of all articles that were found from getArticles
 * @param {array} this.props.following - A list of the topic id's that the user is following
 */
export class Home extends React.Component {
  componentDidMount() {
    this.props.getArticles();
  }
  render() {
    return (
      <div className="home">
        {this.props.articleList
          .filter((article) => {
            const topicIds = article.topics.map((topic) => {
              return topic.id;
            });
            for (let i = 0; i < this.props.following.length; i += 1) {
              for (let j = 0; j < topicIds.length; j += 1) {
                if (this.props.following[i] === topicIds[j]) return true;
              }
            }
            return false;
          })
          .map((article, i) => (
            <ArticleContainer
              key={i}
              title={article.title}
              summary={article.summary}
              createdAt={article.createdAt}
              likes={article.likesCount}
              attribution={article.attribution.displayName}
              mediaURL={article.media[0] ? article.media[0].url : ''}
              id={article.id}
            />
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articleList: state.get('articleList').toJS(),
    following: state.get('following').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getArticles: () => dispatch(getArticles()),
  };
}

Home.propTypes = {
  getArticles: PropTypes.func,
  articleList: PropTypes.array,
  following: PropTypes.array,
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
