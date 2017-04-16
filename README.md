# filter-posts
A web application for filtering and displaying posts retrieved from an API


## Getting Started

  1. Yarn
    -  [ ] run `yarn install`
    -  [ ] run `yarn start`
    -  [ ] Go to [HealthSquare](http://localhost:8080/)
  2. npm
    -  [ ] run `npm i`
    -  [ ] run `npm start`
    -  [ ] Go to [HealthSquare](http://localhost:8080/)

### Site Navigation
1. Click on Topics to be sent to a page with all topics
  * Any topic you click on will add the articles to your home feed
  * If you click a topic a second time it will remove it from your following and homefeed
  * Once you found all topics you want to follow click on home or HealthSquare
2. Read the summary of any article that interests you
  * You may click on the article title to be redirected to a new page
  * This page will now show the body of the article instead of a summary of the article
3. You can use the back buttons or the navigation to navigate back to your feed or following topics
  * Data persists through navigation events unless the user navigates away from localhost
  * Data will not persist through page refreshes
