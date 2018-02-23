import React from 'react'
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  view: {
    alignItems: 'stretch'
  },
  image: {
    aspectRatio: 16 / 9
  },
  text: {
    position: 'absolute',
    bottom: 0,

    width: '100%',

    paddingHorizontal: 12,
    paddingVertical: 6,

    backgroundColor: 'rgba(0,0,0,.3)',
    color: '#FFF',

    fontSize: 14
  }
})

const Stream = ({ stream: { id, title, preview, player }, onPlay }) => (
  <TouchableHighlight
    accessible={ true }
    accessibilityLabel={ title }
    onPress={ onPlay }
  >
    <View style={ styles.view }>
      <Image source={{ uri: preview }} style={ styles.image } />
      <Text numberOfLines={1} style={ styles.text }>{ title }</Text>
    </View>
  </TouchableHighlight>
)

export default Stream;
