import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import './Layout.scss';

const Layout = props =>
  <div className="layout">
    <nav className="nav">
      <h1><Link to="/">HealthSquare</Link></h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
    </nav>
    <main>
      {props.children}
    </main>
  </div>;

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
