const { ApolloServer } = require('apollo-server-micro')
const schema = require('./schema')

const apolloServer = new ApolloServer({ schema })
module.exports = apolloServer.createHandler()
