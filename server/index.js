const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema')

const app = module.exports = express()
app.use('/graphql', express.json(), graphqlExpress({ schema }))

if (app.get('env') === 'development') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

if (require.main === module) {
  app.listen(process.env.PORT)
}
