const { makeExecutableSchema } = require('graphql-tools')

const pages = [
  {
    slug: '/',
    title: 'Homepage',
    content: '<p>This is homepage content</p>'
  },
  {
    slug: '/about',
    title: 'About us',
    content: '<p>This is about us content</p>'
  },
  {
    slug: '/contact',
    title: 'Contact us',
    content: '<p>This is contact us content</p>'
  }
]

const typeDefs = `
  type Query {
    pageBySlug(slug: String!): Page
    allPages: [Page]
  }
  type Page {
    slug: String!
    title: String!
    content: String!
  }
`

const resolvers = {
  Query: {
    pageBySlug(parent, { slug }, context) {
      return pages.find(page => page.slug === slug)
    },
    allPages(parent, args, context) {
      return pages
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const context = ({ req, res }) => {
  return {
    xx: 'hei'
  }
}

module.exports = {
  schema,
  context
}
