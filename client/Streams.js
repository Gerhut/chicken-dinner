import React from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'

import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import Stream from './Stream'

class Streams extends React.Component {
  constructor (props) {
    super(props)
    this.state = { loadingState: 'initial' }

    this.refresh = this.refresh.bind(this)
    this.more = this.more.bind(this)
  }

  refresh () {
    if (this.props.loading) return
    this.setState({ loadingState: 'refresh' })
    this.props.refresh()
  }
  more () {
    if (this.props.loading) return
    this.setState({ loadingState: 'more' })
    this.props.more()
  }

  render () {
    const { loading, streams, play } = this.props
    const { loadingState } = this.state
    return (
      <FlatList
        style={{ backgroundColor: "#6441A4" }}
        data={ streams }
        keyExtractor={ stream => stream.id }
        renderItem={ ({ item: stream }) => (
          <Stream stream={ stream } onPlay={ () => play(stream) } />
        ) }
        refreshControl={
          <RefreshControl
            refreshing={ loadingState === 'refresh' && loading }
            onRefresh={ this.refresh }
            colors={["#6441A4"]}
            tintColor="#FFF"
          />
        }
        onEndReached={ this.more }
        ListFooterComponent={
          <Text style={{
            paddingVertical: 12,
            color: "#FFF",
            fontSize: 16,
            textAlign: "center"
          }}>Loading...</Text>
        }
      />
    )
  }
}

const WrappedStreams = graphql(gql`
  query Query($game: String!, $offset: Int = 0) {
    streams(game: $game, offset: $offset) {
      id
      title
      preview
      player
    }
  }
`, {
  options: ({ navigation: { state: { params: { game } } } }) => ({ variables: { game } }),
  props: ({
    ownProps: { navigation },
    data: { streams=[], loading, refetch, fetchMore }
  }) => ({
    streams,
    loading,
    refresh: () => refetch(),
    more: () => fetchMore({
      variables: { offset: streams.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const idSet = new Set(previousResult.streams.map(stream => stream.id))
        const streams = [
          ...previousResult.streams,
          ...fetchMoreResult.streams.filter(stream => !idSet.has(stream.id))
        ]
        return { ...previousResult, streams }
      }
    }),
    play: stream => navigation.navigate('Player', { stream })
  })
})(Streams)

WrappedStreams.navigationOptions = {
  header: null
}

export default WrappedStreams
