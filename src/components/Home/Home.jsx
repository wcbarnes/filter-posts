import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleContainer from '../Article';

import './Home.scss';

/**
 * Represents the homepage and feed.
 * @constructor
 * @param {array} props.articleList - A list of all articles that were found from getArticles
 * @param {array} props.following - A list of the topic id's that the user is following
 */
const Home = props =>
  <div className="home">
    {props.articleList
      .filter((article) => {
        const topicIds = article.topics.map(topic => topic.id);
        for (let i = 0; i < props.following.length; i += 1) {
          for (let j = 0; j < topicIds.length; j += 1) {
            if (props.following[i] === topicIds[j]) return true;
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
  </div>;

function mapStateToProps(state) {
  return {
    articleList: state.get('articleList') ? state.get('articleList').toJS() : [],
    following: state.get('following') ? state.get('following').toJS() : [],
  };
}

Home.propTypes = {
  articleList: PropTypes.array,
};

export const HomeContainer = connect(mapStateToProps)(Home);
