import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import PageHelper from 'components/PageHelper'
import PageTitle from 'components/PageTitle'
import HtmlContent from 'components/HtmlContent'

const query = gql(`
  query Page($slug: String!) {
    pageBySlug(slug: $slug) {
      title
      content
    }
  }
`)

const Home = () => {
  const { data = {}, loading } = useQuery(query, {
    variables: {
      slug: '/'
    }
  })
  return (
    <PageHelper {...data.pageBySlug} loading={loading}>
      {data.pageBySlug && (
        <>
          <PageTitle>{data.pageBySlug.title}</PageTitle>
          <HtmlContent content={data.pageBySlug.content} />
        </>
      )}
    </PageHelper>
  )
}

export default Home
