import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import PropTypes from 'prop-types';

import './Article.scss';

/**
 * Represents an article.
 * @constructor
 * @param {string} props.title - Title of the article
 * @param {string} props.summary - Summary of the article
 * @param {string} props.createdAt - When the article was written
 * @param {string} props.attribution - What source the article came from
 * @param {number} props.likes - How many times the article has been liked
 * @param {string} props.mediaURL - URL for an image related to the article
 */
const Article = props =>
  <div className="article">
    <h1 className="article-title"><Link to={`/article/${props.id}`}>{props.title}</Link></h1>
    <h3 className="article-source">Source: {props.attribution}</h3>
    <h3 className="article-created">{moment(props.createdAt).format('MMM DD')}</h3>
    {props.mediaURL ? <img src={props.mediaURL} alt={props.title} /> : ''}
    <p className="article-content">{props.summary}</p>
    <h3 className="article-likes">{props.likes} {props.likes === 1 ? 'Like' : 'Likes'}</h3>
  </div>;

Article.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  createdAt: PropTypes.string,
  attribution: PropTypes.string,
  likes: PropTypes.number,
  mediaURL: PropTypes.string,
};

export const ArticleContainer = Article;
