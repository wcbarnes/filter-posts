import { Map, List } from 'immutable';

const INITIAL_STATE = Map({
  articleList: List([]),
  topicList: List([]),
  following: List([]),
  currentArticle: Map({}),
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_ARTICLES_SUCCESS':
      return state.merge({
        articleList: action.payload,
      });
    case 'GET_TOPICS_SUCCESS':
      return state.merge({
        topicList: action.payload,
      });
    case 'GET_ARTICLE_SUCCESS':
      return state.merge({
        currentArticle: action.payload,
      });
    case 'UPDATE_FOLLOWING':
      return state.updateIn(['following'], list => list.toJS().includes(action.payload)
        ? list.filter(id => id !== action.payload)
        : list.push(action.payload));
    default: return state;
  }
}
