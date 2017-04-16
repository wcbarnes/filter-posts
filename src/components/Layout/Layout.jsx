import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getArticles, getTopics } from '../../action-creators/action-creators.jsx';

import './Layout.scss';

/**
 * Represents the base layout of the page. Currently holds the with links to Topics and the Homepage/Feed
 * @constructor
 * @param {object} props.children - The child components of the layout
 * @param {function} this.props.getArticles - Gets all articles from the API
 * @param {function} this.props.getTopics - Gets all topics from the API
 */
export class Layout extends React.Component {
  componentDidMount() {
    this.props.getArticles();
    this.props.getTopics();
  }
  render() {
    return (
      <div className="layout">
        <nav className="nav">
          <h1><Link to="/">HealthSquare</Link></h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>
        </nav>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getArticles: () => dispatch(getArticles()),
    getTopics: () => dispatch(getTopics()),
  };
}

Layout.propTypes = {
  children: PropTypes.object,
  getArticles: PropTypes.func,
  getTopics: PropTypes.func,
};

export const LayoutContainer = connect(undefined, mapDispatchToProps)(Layout);
