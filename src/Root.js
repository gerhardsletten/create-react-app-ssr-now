import React from 'react'
import { hot } from 'react-hot-loader'
import { createGlobalStyle } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/react-hooks'

import App from 'containers/App/App'
import bodyStyle from 'helpers/bodyStyle'

const GlobalStyle = createGlobalStyle`${bodyStyle}`

export const Root = ({ client, helmetContext, tokenValue }) => (
  <HelmetProvider context={helmetContext}>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </HelmetProvider>
)

export default hot(module)(Root)
