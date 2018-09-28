import React, { Component } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Info from '../../JSON/AnnounceImage.json';
import { Header, Card } from '../common';

const data = Info;
const numColumns = 2;

class List extends Component {
  state = { headerText: 'Images', Selected: '' };

  renderItem({ item }) {
    const { key, uri, text } = item;
    return (
      <TouchableOpacity
        onPress={() => this.setState({ headerText: text, Selected: key })}
      >
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{ uri }}
        />
        <Text style={{ alignSelf: 'center', fontSize: 16 }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
    height: 190,
    width: 190,
    flex: 1,
  }
};

export default List;
