import React from 'react'
import { StackNavigator } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'

import client from './client'
import Streams from './Streams'
import Player from './Player'

const Navigator = StackNavigator({
  Streams: { screen: Streams },
  Player: { screen: Player }
}, {
  initialRouteName: 'Streams',
  initialRouteParams: { game: "PLAYERUNKNOWN'S BATTLEGROUNDS" }
})

export default () => <ApolloProvider client={client}>
  <Navigator />
</ApolloProvider>
