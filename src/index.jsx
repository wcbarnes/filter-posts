import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers/reducer.jsx';
import rootSaga from './sagas/sagas.jsx';

import Layout from './components/Layout';
import HomeContainer from './components/Home';
import ArticleViewContainer from './components/ArticleView';
import TopicContainer from './components/TopicView';

import './assets/reset.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={Layout}>
        <Route path="/" component={HomeContainer} />
        <Route path="/topics" component={TopicContainer} />
        <Route path="/article/:id" component={ArticleViewContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
