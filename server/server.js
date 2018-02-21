const express = require('express')
const cors = require('cors')

// Create a GraphQL HTTP server with any HTTP web framework that supports
// Connect-styled middleware, including Connect itself, Express and Restify.
const graphqlHTTP = require('express-graphql')

// Creates a GraphQLSchema object from GraphQL schema language, using default resolvers.
const { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language.
// @see http://graphql.org/learn/schema/
// @see https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6
// language=GraphQL Schema
const schema = buildSchema(`
  # Root type has to be Query or Mutation.
  type Query {
  
    # Field returns a nullable string.
    quoteOfTheDay: String
    
    # Field returns a non-null floating-point number.
    random: Float!
    
    # Field with multiple arguments, returns a non-null list of non-null integers. 
    rollDice(numDice: Int!, numSides: Int): [Int!]!
  }
`)

// The root provides a resolver function for each API endpoint.
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
  },
  random: () => {
    return Math.random()
  },
  rollDice: function ({ numDice, numSides }) {
    const output = []
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  }
}

const app = express()

// Allow requests from all origins, don't do this on production!
app.use(cors())

// Mount the GraphQL HTTP server middleware function at the specified path.
app.use('/graphql', graphqlHTTP({

  // A GraphQLSchema instance from GraphQL.js. A schema must be provided.
  schema: schema,

  // A value to pass as the rootValue to the graphql() function from GraphQL.js/src/execute.js.
  rootValue: root,

  // If true, presents GraphiQL when the GraphQL endpoint is loaded in a browser.
  graphiql: true
}))

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql.')
