import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Alert, Button, Box } from '@smooth-ui/core-sc'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'

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

const Page = ({
  match: {
    params: { slug }
  },
  staticContext
}) => {
  const { data, loading } = useQuery(query, {
    variables: {
      slug: `/${slug}`
    }
  })
  if (!!staticContext && !loading && !data.pageBySlug) {
    staticContext.status = 404
  }
  const found = data && data.pageBySlug
  const title = found ? found.title : loading ? 'Loading' : '404 Not found'
  return (
    <PageHelper title={title} loading={loading}>
      {found && (
        <>
          <PageTitle>{found.title} v3</PageTitle>
          <HtmlContent content={found.content} />
        </>
      )}
      {!loading && !found && (
        <Alert as="div">
          <>
            <Box as="p" mb="2">
              The page <strong>/{slug}</strong> was not found.
            </Box>
            <Button as={Link} to="/" mb="2">
              Go back to homepage
            </Button>
          </>
        </Alert>
      )}
    </PageHelper>
  )
}

export default Page
