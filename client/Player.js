import React from 'react'
import { WebView } from 'react-native'

const Player = props => (
  <WebView source={{ uri: props.navigation.state.params.stream.player }} />
)

Player.navigationOptions = props => ({
  title: props.navigation.state.params.stream.title
})

export default Player;
