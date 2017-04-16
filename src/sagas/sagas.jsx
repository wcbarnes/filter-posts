import { takeLatest } from 'redux-saga';
import axios from 'axios';
import { put } from 'redux-saga/effects';

/** A list of possible API endpoints */
const ARTICLES_ENDPOINT = 'https://medcircle-coding-project.s3.amazonaws.com/api/articles.json';
const TOPICS_ENDPOINT = 'https://medcircle-coding-project.s3.amazonaws.com/api/topics.json';
const ARTICLE_ENDPOINT = 'https://medcircle-coding-project.s3.amazonaws.com/api/articles/';

/**
 * A function to handle get requests to the API to different endpoints
 * @function
 * @param {url} - The url for the wanted endpoint that will be used in the closure
 * @param {action} - If an action was passed we know that an id was passed so we know we need to add the id in the payload to the url and end the url with .json
 */
const getFromAPI = url => action => axios.get(action ? `${url}${action.payload}.json` : url)
  .then(response => response.data.data)
  .catch(error => console.log(error));

/** A list of functions for making get requests */
const getArticlesFromAPI = getFromAPI(ARTICLES_ENDPOINT);
const getTopicsFromAPI = getFromAPI(TOPICS_ENDPOINT);
const getArticleFromAPI = getFromAPI(ARTICLE_ENDPOINT);

/**
 * A generator to Load articles from the API
 * Goes to Reducer failure which goes to default cause if the request isn't finished.
 * Goes to reducer success when the request is finished which merges all found articles into the state.
 * @function
 */
function* loadArticles() {
  try {
    const articleList = yield getArticlesFromAPI();
    yield put({ type: 'GET_ARTICLES_SUCCESS', payload: articleList });
  } catch (error) {
    yield put({ type: 'GET_ARTICLES_FAILURE' });
  }
}

/**
 * A generator to Load topics from the API
 * Goes to Reducer failure which goes to default cause if the request isn't finished.
 * Goes to reducer success when the request is finished which merges all found topics into the state.
 * @function
 */
function* loadTopics() {
  try {
    const topicList = yield getTopicsFromAPI();
    yield put({ type: 'GET_TOPICS_SUCCESS', payload: topicList });
  } catch (error) {
    yield put({ type: 'GET_TOPICS_FAILURE' });
  }
}

/**
 * A generator to Load a specific article from its id from the API
 * Goes to Reducer failure which goes to default cause if the request isn't finished.
 * Goes to reducer success when the request is finished which merges the found article into the state.
 * @function
 */
function* loadArticle(id) {
  try {
    const article = yield getArticleFromAPI(id);
    yield put({ type: 'GET_ARTICLE_SUCCESS', payload: article });
  } catch (error) {
    yield put({ type: 'GET_ARTICLE_FAILURE' });
  }
}

/**
 * A generator to make sure only the most recent API call is running on getArticles
 * @function
 */
function* watchGetArticles() {
  yield takeLatest('GET_ARTICLES', loadArticles);
}

/**
 * A generator to make sure only the most recent API call is running on getTopics
 * @function
 */
function* watchGetTopics() {
  yield takeLatest('GET_TOPICS', loadTopics);
}

/**
 * A generator to make sure only the most recent API call is running to get a specific article
 * @function
 */
function* watchGetArticle() {
  yield takeLatest('GET_ARTICLE', loadArticle);
}

/**
 * Exporting the rootSaga that contains all api watch
 * @function
 */
export default function* rootSaga() {
  yield [
    watchGetArticles(),
    watchGetTopics(),
    watchGetArticle(),
  ];
}
