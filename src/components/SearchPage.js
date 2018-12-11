import React from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableHighlight } from 'react-native';
import { InstantSearch, connectInfiniteHits, connectSearchBox, connectHighlight, connectRefinementList } from 'react-instantsearch-native';
import { ALGOLIA_APP_ID, ALGOLIA_API_SEARCH_KEY, ALGOLIA_INDEX_NAME } from 'react-native-dotenv';
import { Card, CardSection } from './common';

const RefinementList = connectRefinementList(({ refine, items }) =>
  <FlatList
    data={items}
    keyExtractor={(item, index) => item.objectID}
    ListHeaderComponent={() =>
      <Text style={{ marginTop: 20, height: 50, alignSelf: 'center' }}>
        Categories
      </Text>}
    renderItem={({ item }) => {
      return (
        <View style={{ height: 30 }}>
          <TouchableHighlight
            onPress={() => {
              refine(item.value);
            }}
          >
            <Text style={item.isRefined ? { fontWeight: 'bold' } : {}}>
              {item.label}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }}
  />
);

const Highlight = connectHighlight(
  ({ highlight, attribute, hit, highlightProperty }) => {
    const parsedHit = highlight({
      attribute,
      hit,
      highlightProperty: '_highlightResult',
    });
    const highlightedHit = parsedHit.map((part, idx) => {
      if (part.isHighlighted)
        return (
          <Text key={idx} style={{ backgroundColor: '#ffff99' }}>
            {part.value}
          </Text>
        );
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
      placeholder={'Search a product...'}
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
        // datestring, info, title, uri or url
        return (
          <Card>
           <Text>
            <Highlight attribute="title" hit={item} />
           </Text>
           <Text><Highlight attribute="info" hit={item} /></Text>
          </Card>
        );
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
        <RefinementList attribute="categories" />
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
