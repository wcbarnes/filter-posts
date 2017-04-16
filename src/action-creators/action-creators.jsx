/**
 * action-creator for getting all articles
 * Goes to sagas
 * @function
 */
export function getArticles() {
  return {
    type: 'GET_ARTICLES',
  };
}

/**
 * action-creator for getting all topics
 * goes to sagas
 * @function
 */
export function getTopics() {
  return {
    type: 'GET_TOPICS',
  };
}

/**
 * action-creator for updating what topics the user is following
 * goes to reducer
 * @function
 * @param {number} topicID - The id passed from the React component that corresponds with a clicked topic
 */
export function updateFollowing(topicID) {
  return {
    type: 'UPDATE_FOLLOWING',
    payload: topicID,
  };
}

/**
 * action-creator for getting a specific article by its id
 * goes to saga
 * @function
 * @param {string} - The id of the article that was clicked in the Homepage
 */
export function getArticle(id) {
  return {
    type: 'GET_ARTICLE',
    payload: id,
  };
}
