import React from 'react'
import { render, hydrate } from 'react-dom'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import { persistCache } from 'apollo-cache-persist'
import Emitter from 'tiny-emitter'

import * as serviceWorker from './serviceWorker'
import Root from 'Root'

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)

const dest = document.getElementById('root')

const emitter = new Emitter()

async function renderMain(func) {
  if (window.__APOLLO_STATE__) {
    await loadableReady()
  }
  await persistCache({
    cache,
    storage: window.localStorage
  })
  const client = new ApolloClient({
    uri: '/graphql',
    cache
  })
  func(
    <Router>
      <Root client={client} emitter={emitter} />
    </Router>,
    dest
  )
}

renderMain(window.__APOLLO_STATE__ ? hydrate : render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: () => {
    console.log('serviceWorker onSuccess')
  },
  onUpdate: registration => {
    console.log('serviceWorker onUpdate')
    const waitingServiceWorker = registration.waiting
    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', event => {
        if (event.target.state === 'activated') {
          window.location.reload()
        }
      })
      emitter.emit('shouldUpdate', {
        ok: () => {
          console.log('ok pressed')
          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
        },
        cancel: () => console.log('cancel pressed'),
        message: 'New version of the app is available, do you want to update?'
      })
      window.addEventListener('beforeunload', event => {
        console.log('close/reload')
        waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
      })
    }
  }
})
