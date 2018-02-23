const { makeExecutableSchema } = require('graphql-tools')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

const typeDefs = /* GraphQL */`
  type Stream {
    id: ID!
    title: String!
    preview: String!
    player: String!
  }

  type Query {
    streams(game: String!, first: Int, offset: Int): [Stream]
  }

  schema {
    query: Query
  }
`
const resolvers = {
  Query: {
    async streams (root, { game, first, offset }) {
      const params = new URLSearchParams({ game })
      if (first != null) params.set('limit', first)
      if (offset != null) params.set('offset', offset)

      const response = await fetch(`https://api.twitch.tv/kraken/streams/?${params}`, {
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': process.env.TWITCH_CLIENT_ID
        }
      })
      const body = await response.json()
      return body['streams'].map(streamBody => ({
        id: streamBody['_id'],
        title: streamBody['channel']['status'],
        player: `http://player.twitch.tv/?channel=${
          encodeURIComponent(streamBody['channel']['name'])
        }`,
        preview: streamBody['preview']['large']
      }))
    }
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
