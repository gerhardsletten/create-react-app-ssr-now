import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Layout from 'components/Layout'
import NotifyDialog from 'components/NotifyDialog'

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

const UPDATE_EVENT = 'shouldUpdate'

const Notify = ({ emitter }) => {
  const [notify, setNotify] = useState(null)
  useEffect(() => {
    emitter.on(UPDATE_EVENT, obj => setNotify(obj))
    return () => {
      emitter.off(UPDATE_EVENT)
    }
  }, [setNotify, emitter])
  const onUpdate = () => {
    notify.ok()
  }
  const onCancel = () => {
    setNotify(null)
    notify.cancel()
  }
  if (notify) {
    return (
      <NotifyDialog
        title={notify.message}
        onOk={onUpdate}
        onCancel={onCancel}
      />
    )
  }
  return null
}

const App = ({ emitter }) => {
  const { data = {} } = useQuery(query)
  return (
    <Layout menu={data.allPages}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/oldpage" exact component={OldPage} />
        <Route path="/:slug" component={Page} />
      </Switch>
      {emitter && <Notify emitter={emitter} />}
    </Layout>
  )
}

export default App
