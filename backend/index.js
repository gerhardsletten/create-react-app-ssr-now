const { ApolloServer } = require('apollo-server-micro')
const { schema, context } = require('./schema')

const apolloServer = new ApolloServer({ schema, context })
module.exports = apolloServer.createHandler()
