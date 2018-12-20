import React from 'react';
import {
  Image, StyleSheet, View, FlatList, Text, TextInput, Modal, SafeAreaView, TouchableOpacity,
  Dimensions
} from 'react-native';
import { InstantSearch, connectInfiniteHits, connectSearchBox, connectHighlight
} from 'react-instantsearch-native';
import { ALGOLIA_APP_ID, ALGOLIA_API_SEARCH_KEY, ALGOLIA_INDEX_NAME } from 'react-native-dotenv';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';

// next: use refinement list or something to sort search results
const { width } = Dimensions.get('window');

const Highlight = connectHighlight(
  ({ highlight, attribute, hit, highlightProperty }) => {
    const parsedHit = highlight({
      attribute,
      hit,
      highlightProperty: '_highlightResult',
    });
    const highlightedHit = parsedHit.map((part, idx) => {
      if (part.isHighlighted) {
        return (
          <Text key={idx} style={{ backgroundColor: '#ffff99' }}>
            {part.value}
          </Text>
        );
      }
      return part.value;
    });
    return <Text>{highlightedHit}</Text>;
  }
);

const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
  const styles = {
    height: 60,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    flex: 1,
  };

  return (
    <TextInput
      style={styles}
      onChangeText={text => refine(text)}
      value={currentRefinement}
      placeholder={'Search for Announcements or Events!'}
      clearButtonMode={'always'}
      spellCheck={false}
      autoCorrect={false}
      autoCapitalize={'none'}
    />
  );
});


const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {
  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function () {
    if (hasMore) {
      refine();
    }
  };

  return (
    <FlatList
      data={hits}
      onEndReached={onEndReached}
      keyExtractor={(item, index) => item.objectID}
      renderItem={({ item }) => {
        console.log('rendering');
        // announcements have a {dateString, info, title, idefault, uid, uri or url}
        if (item.hasOwnProperty('dateString')) {
          return (
            <Card>
              <CardSection style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 20 }}>
                  <Highlight attribute="title" hit={item} />
                </Text>
              </CardSection>
              <CardSection style={{ borderBottomWidth: 0, alignItems: 'center' }}>
                  <Image
                    resizeMode="contain"
                    style={{ height: 90, flex: 1 }}
                    source={{ uri: item.uri }}
                  />
                <Text style={{ color: 'black', fontSize: 18, flex: 2 }}>
                  <Highlight attribute="info" hit={item} />
                </Text>
              </CardSection>
              <CardSection style={{ justifyContent: 'flex-end' }}>
                <Text>{item.dateString}</Text>
              </CardSection>
            </Card>
          );
        } else if (item.hasOwnProperty('date')) {
          // events have a {date, info, title, location, uid}
          return (
            <Card>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 20, marginRight: 20 }}>
                 <Highlight attribute="title" hit={item} />
                </Text>
                <Icon name='calendar-alt' size={20} color='#888' />
              </View>
              <CardSection style={{ flex: 1, justifyContent: 'flex-start', borderBottomWidth: 0 }}>
                <Text style={{ color: 'black', fontSize: 18 }}>
                 <Highlight attribute="info" hit={item} />
                </Text>
              </CardSection>
              <CardSection style={{ flex: 1, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15 }}>
                  <Highlight attribute="location" hit={item} />
                </Text>
                <Text style={{ fontSize: 15 }}>{item.date}</Text>
              </CardSection>
            </Card>
          );
        }
        return (
          <View>
            <Text> Something went wrong. </Text>
          </View>
        );
      }}
    />
  );
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false, imageModal: false, imageUrl: null };
    this.openModal = this.openModal.bind(this);
  }

  openModal(url) {
    this.setState({ imageModal: true, imageUrl: url });
  }

  closeModal() {
    this.setState({ imageModal: false, imageUrl: null });
  }

  render() {
    return (
      <View style={styles.container}>
        <InstantSearch
          appId={ALGOLIA_APP_ID}
          apiKey={ALGOLIA_API_SEARCH_KEY}
          indexName={ALGOLIA_INDEX_NAME}
        >
        <View style={{ flexDirection: 'row' }}>
          <SearchBox />
        </View>
        <Hits
          openModal={this.openModal}
        />
        </InstantSearch>
        <Modal
          visible={this.state.imageModal}
          onRequestClose={() => this.setModalVisible}
        >
          <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <TouchableOpacity
              modalBackStyle={styles.modalBackStyle}
              onPress={() => this.closeModal.bind(this)}
            >
              <View style={{ flex: -1, margin: 5, paddingLeft: 10, alignContent: 'flex-start' }}>
                <Icon name={'chevron-left'} color={'white'} size={30} />
              </View>
            </TouchableOpacity>
            <Image
              style={{ flex: 0, height: width, width, alignSelf: 'center', alignContent: 'center' }}
              source={{ uri: this.state.imageUrl }}
            />
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  modalBackStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 5,
    marginTop: 5,
    borderWidth: 2,
    padding: 5
  }
});
