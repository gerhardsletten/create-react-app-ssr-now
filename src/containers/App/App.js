import React from 'react'
import loadable from '@loadable/component'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Layout from 'components/Layout'

const Home = loadable(() =>
  import(/* webpackChunkName: "Home" */ '../Home/Home')
)
const Page = loadable(() =>
  import(/* webpackChunkName: "Page" */ '../Page/Page')
)

const query = gql(`
  query AllPages {
    allPages {
      title
      slug
    }
  }
`)

const OldPage = () => {
  return <Redirect to="/" />
}

const App = () => {
  const { data = {} } = useQuery(query)
  return (
    <Layout menu={data.allPages}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/oldpage" exact component={OldPage} />
        <Route path="/:slug" component={Page} />
      </Switch>
    </Layout>
  )
}

export default App
