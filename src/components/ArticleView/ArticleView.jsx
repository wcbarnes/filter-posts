import React from 'react';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getArticle } from '../../action-creators/action-creators.jsx';

import '../Home/Article/Article.scss';

/**
 * Represents the view when viewing a single article.
 * @constructor
 * @param {function} this.props.getArticle - Gets information for the current article
 * @param {string} this.props.params - The parameter from the link that holds the id of the article
 * @param {object} this.props.currentArticle - The information about the article
 */
export class ArticleView extends React.Component {
  componentDidMount() {
    this.props.getArticle(this.props.params.id);
  }
  render() {
    const article = this.props.currentArticle[0];
    return !article ? <div /> : (
      <div className="article">
        <h1 className="article-title">{article.title}</h1>
        <h3 className="article-source">Source: {article.attribution.displayName}</h3>
        <h3 className="article-created">{moment(article.createdAt).format('MMM DD')}</h3>
        {article.media[0] ? <img src={article.media[0].url} alt={article.title} /> : ''}
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body) }}
        />
        <h3 className="article-likes">{article.likesCount} {article.likesCount === 1 ? 'Like' : 'Likes'}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentArticle: state.get('currentArticle').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return { getArticle: id => dispatch(getArticle(id)) };
}

ArticleView.propTypes = {
  getArticle: PropTypes.func,
  params: PropTypes.object,
  currentArticle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export const ArticleViewContainer = connect(mapStateToProps, mapDispatchToProps)(ArticleView);
