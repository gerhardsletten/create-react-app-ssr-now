import React from 'react'
import { render, hydrate } from 'react-dom'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

import * as serviceWorker from './serviceWorker'
import Root from 'Root'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

const dest = document.getElementById('root')

async function renderMain(func) {
  if (window.__APOLLO_STATE__) {
    await loadableReady()
  }
  func(
    <Router>
      <Root client={client} />
    </Router>,
    dest
  )
}

renderMain(window.__APOLLO_STATE__ ? hydrate : render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
