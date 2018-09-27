import React, { Component } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, YellowBox } from 'react-native';
import Info from '../../JSON/AnnounceImage.json';
import { Header, Card } from '../common';

//remove this after updating to a stable release of react native
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

const data = Info;
const numColumns = 2;

class List extends Component {
  state = { headerText: 'Images' };

  renderItem(item) {
    const { uri, text } = item;
    return (
      <Card>
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{ uri }}
        />
        <Text>
          {text}
        </Text>
      </Card>
    );
  }

  render() {
    return (
      <View>
        <Header headerText={this.state.headerText} />
        <FlatList
          style={styles.list}
          data={data}
          renderItem={item => this.renderItem(item)}
          numColumns={numColumns}
        />
      </View>
    );
  }
}


const styles = {
  listItem: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    minWidth: 150,
    maxWidth: 223,
    height: 304,
    maxHeight: 304,
    backgroundColor: '#eee',
  },
  list: {
    flex: 1,
    backgroundColor: '#eee'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  image: {
    flex: 1,
    minHeight: 100,
    minWidth: 100
  }
};

export default List;
