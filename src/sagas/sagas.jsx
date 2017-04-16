import { takeLatest, delay } from 'redux-saga';
import axios from 'axios';
import { put } from 'redux-saga/effects';

const ARTICLES_ENDPOINT = 'https://medcircle-coding-project.s3.amazonaws.com/api/articles.json';
const TOPICS_ENDPOINT = 'https://medcircle-coding-project.s3.amazonaws.com/api/topics.json';
const ARTICLE_ENDPOINT = 'https://medcircle-coding-project.s3.amazonaws.com/api/articles/';


const getFromAPI = url => action => axios.get(action ? `${url}${action.payload}.json` : url)
  .then(response => response.data.data)
  .catch(error => console.log(error));

const getArticlesFromAPI = getFromAPI(ARTICLES_ENDPOINT);
const getTopicsFromAPI = getFromAPI(TOPICS_ENDPOINT);
const getArticleFromAPI = getFromAPI(ARTICLE_ENDPOINT);

function* loadArticles() {
  try {
    yield delay(1000);
    const articleList = yield getArticlesFromAPI();
    yield put({ type: 'GET_ARTICLES_SUCCESS', payload: articleList });
  } catch (error) {
    yield put({ type: 'GET_ARTICLES_FAILURE' });
  }
}

function* loadTopics() {
  try {
    const topicList = yield getTopicsFromAPI();
    yield put({ type: 'GET_TOPICS_SUCCESS', payload: topicList });
  } catch (error) {
    yield put({ type: 'GET_TOPICS_FAILURE' });
  }
}

function* loadArticle(id) {
  try {
    const article = yield getArticleFromAPI(id);
    yield put({ type: 'GET_ARTICLE_SUCCESS', payload: article });
  } catch (error) {
    yield put({ type: 'GET_ARTICLE_FAILURE' });
  }
}

function* watchGetArticles() {
  yield takeLatest('GET_ARTICLES', loadArticles);
}

function* watchGetTopics() {
  yield takeLatest('GET_TOPICS', loadTopics);
}

function* watchGetArticle() {
  yield takeLatest('GET_ARTICLE', loadArticle);
}

export default function* rootSaga() {
  yield [
    watchGetArticles(),
    watchGetTopics(),
    watchGetArticle(),
  ];
}
