import React, { Component } from 'react';
import { Dimensions, Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Info from '../../JSON/AnnounceImage.json';
import { Header } from '../common';

const data = Info;
const numColumns = 2;
const { height, width } = Dimensions.get('window');

class List extends Component {
  state = { headerText: 'Images', Selected: '' };

  renderItem({ item }) {
    const { key, uri, text } = item;
    return (
      <TouchableOpacity
        style={styles.touchStyle}
        onPress={() => this.setState({ headerText: text, Selected: key })}
      >
        <Image
          resizeMode='contain'
          style={{ height: height / 3, width: width / 2 }}
          source={{ uri }}
        />
        <Text
          style={styles.text}
        >
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
  listItem: {
    flex: 1,
    marginBottom: 5,
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
    height: 160,
    width: 160,
    alignSelf: 'center'
  },
  touchStyle: {
    flex: 1,
    alignSelf: 'center',
    margin: 5
  }
};

export default List;
