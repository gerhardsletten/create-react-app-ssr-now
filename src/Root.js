import React from 'react'
import { hot } from 'react-hot-loader'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/react-hooks'
import { theme } from '@smooth-ui/core-sc'

import App from 'containers/App/App'
import bodyStyle from 'helpers/bodyStyle'

const GlobalStyle = createGlobalStyle`${bodyStyle}`

export const Root = ({ client, helmetContext, tokenValue, emitter }) => (
  <HelmetProvider context={helmetContext}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <App emitter={emitter} />
      </ApolloProvider>
    </ThemeProvider>
  </HelmetProvider>
)

export default hot(module)(Root)
