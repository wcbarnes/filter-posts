export function getArticles() {
  return {
    type: 'GET_ARTICLES',
  };
}

export function getTopics() {
  return {
    type: 'GET_TOPICS',
  };
}

export function updateFollowing(topicID) {
  return {
    type: 'UPDATE_FOLLOWING',
    payload: topicID,
  };
}

export function getArticle(id) {
  return {
    type: 'GET_ARTICLE',
    payload: id,
  };
}
