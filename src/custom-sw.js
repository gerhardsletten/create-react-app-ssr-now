workbox.setConfig({
  debug: true
})

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', event => {
  console.log('got message', event)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    /* eslint-disable-next-line no-restricted-globals */
    self.skipWaiting()
  }
})

/* eslint-disable-next-line no-restricted-globals */
workbox.precaching.precacheAndRoute(self.__precacheManifest)

workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst())
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
)
