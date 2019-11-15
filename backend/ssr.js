const { readFileSync } = require('fs')
const { join } = require('path')
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { SchemaLink } = require('apollo-link-schema')

const getAppState = require('../generated-ssr-helper').default
const { schema, context } = require('./schema')

const statsJSON = readFileSync(
  join(__dirname, '..', 'loadable-stats.json'),
  'utf8'
)
const stats = JSON.parse(statsJSON)

async function getContent({ req, res }) {
  const { url } = req
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({
      schema,
      context: context({ req, res })
    }),
    cache: new InMemoryCache()
  })
  const {
    state,
    markup,
    ctx,
    helmet,
    styleTags,
    loadableElements
  } = await getAppState({ url, client, stats })
  const content = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${styleTags}
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(state)}
        </script>
        ${loadableElements}
      </body>
    </html>
  `
  return {
    content,
    ctx
  }
}

module.exports = async (req, res) => {
  try {
    const { content, ctx } = await getContent({ req, res })
    if (ctx.url) {
      res.writeHead(301, {
        Location: ctx.url
      })
      res.end()
    }
    res.writeHead(ctx.status || 200, {
      'Content-Type': 'text/html'
    })
    res.end(content)
  } catch (error) {
    console.log('error', error)
    res.end(error.message)
  }
}
