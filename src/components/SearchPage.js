import React from 'react';
import { Image, StyleSheet, View, FlatList, Text, TextInput } from 'react-native';
import { InstantSearch, connectInfiniteHits, connectSearchBox, connectHighlight } from 'react-instantsearch-native';
import { ALGOLIA_APP_ID, ALGOLIA_API_SEARCH_KEY, ALGOLIA_INDEX_NAME } from 'react-native-dotenv';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';

// next: use refinement list or something to sort search results

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
        console.log(item);
        // announcements have a {dateString, info, title, idefault, uid, uri or url}
        if (item.hasOwnProperty('dateString')) {
          if (item.isDefault) {
            return (
              <Card>
                <CardSection style={{ flex: 2, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 20 }}>
                    <Highlight attribute="title" hit={item} />
                  </Text>
                </CardSection>
                <CardSection>
                  <Image
                    resizeMode="contain"
                    style={{ alignSelf: 'center' }}
                    source={{ uri: item.uri }}
                  />
                  <Text style={{ color: 'black', fontSize: 18 }}>
                    <Highlight attribute="info" hit={item} />
                  </Text>
                </CardSection>
                <CardSection style={{ justifyContent: 'flex-end' }}>
                  <Text>{item.dateString}</Text>
                </CardSection>
              </Card>
            );
          } else if (item.isDefault === false) {
            return (
              <Card>
                <CardSection style={{ flex: 2, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 20 }}>
                    <Highlight attribute="title" hit={item} />
                  </Text>
                </CardSection>
                <CardSection>
                  <Image
                    resizeMode="contain"
                    style={{ alignSelf: 'center' }}
                    source={{ uri: item.url }}
                  />
                  <Text style={{ color: 'black', fontSize: 18 }}>
                    <Highlight attribute="info" hit={item} />
                  </Text>
                </CardSection>
                <CardSection style={{ justifyContent: 'flex-end' }}>
                  <Text>{item.dateString}</Text>
                </CardSection>
              </Card>
            );
          }
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
                  Location: <Highlight attribute="location" hit={item} />
                </Text>
                <Text style={{ fontSize: 15 }}>{item.date}</Text>
              </CardSection>
            </Card>
          );
        } else {
          return (
            <View>
              <Text> Something went wrong. </Text>
            </View>
          );
        }
      }}
    />
  );
});

export default class App extends React.Component {
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
        <Hits />
        </InstantSearch>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
