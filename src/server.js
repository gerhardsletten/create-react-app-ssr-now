import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToStringWithData } from '@apollo/react-ssr'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'

import Root from './Root'

async function getAppState({ url, client, stats }) {
  let ctx = {}
  let helmetContext = {}
  const commponent = (
    <StaticRouter location={url} context={ctx}>
      <Root
        client={client}
        helmetContext={helmetContext}
        tokenValue={{
          token: null,
          setToken: () => {}
        }}
      />
    </StaticRouter>
  )
  let extractor = new ChunkExtractor({ stats })
  const sheet = new ServerStyleSheet()
  const markup = await renderToStringWithData(
    sheet.collectStyles(extractor.collectChunks(commponent))
  )
  return {
    state: client.extract(),
    markup,
    ctx,
    helmet: helmetContext.helmet,
    styleTags: sheet.getStyleTags(),
    loadableElements: extractor.getScriptTags()
  }
}

export default getAppState
