workbox.setConfig({
  debug: true
})

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('activate', event => {
  /* eslint-disable-next-line no-restricted-globals */
  event.waitUntil(self.clients.claim())
})

/* eslint-disable-next-line no-restricted-globals */
workbox.precaching.precacheAndRoute(self.__precacheManifest)

workbox.routing.registerRoute('/', workbox.strategies.networkFirst())
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
)
