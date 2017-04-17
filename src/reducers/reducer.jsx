import { Map, List } from 'immutable';

/**
 * The initial state of the application
 * @constant
 * @prop {array} articleList - The empty immutable list of articles that will contain all articles
 * @prop {array} topicList - The empty immutable list of topics that will contain all topics
 * @prop {array} following - Starts at null so defaulting for defaulting it to all topics after API call
 * @prop {object} currentArticle - The empty immutable map that will contain all properties of the currently viewed article
 */
const INITIAL_STATE = Map({
  articleList: List([]),
  topicList: List([]),
  following: null,
  currentArticle: Map({}),
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    /**
     * Reducer for when the loadArticles saga succeeds
     * Will merge the found articles into the current state
     */
    case 'GET_ARTICLES_SUCCESS':
      return state.merge({
        articleList: action.payload,
      });
    /**
     * Reducer for when the loadTopic saga succeeds
     * Will merge the found topics into the current state
     * When the first API call is made it will default following to all topics
     * Otherwise it will just return the current following
     */
    case 'GET_TOPICS_SUCCESS':
      return state.merge({
        topicList: action.payload,
        following: state.get('following') ? state.get('following') : action.payload.map(topic => topic.id),
      });
    /**
     * Reducer for when the loadArticle saga succees
     * Will overwrite the old single article with the new one
     */
    case 'GET_ARTICLE_SUCCESS':
      return state.merge({
        currentArticle: action.payload,
      });
    /**
     * Reducer to update the state based on which topics the user has selected
     * Will first check to see if the selected topic exists in the following category already
     * If it does it will filter through the list and keep everything except for the sent topic so the user can unfollow the topic
     * If it doesn't it will add the topic id into the list of followed topics
     */
    case 'UPDATE_FOLLOWING':
      return state.updateIn(
        ['following'],
        list =>
          list.toJS().includes(action.payload)
            ? list.filter(id => id !== action.payload)
            : list.push(action.payload));
    /**
     * When the sagas return actions for failures, it will just continue to return the last known state
     */
    default: return state;
  }
}
