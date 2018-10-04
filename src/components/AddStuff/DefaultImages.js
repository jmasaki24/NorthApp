import React, { Component } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Info from '../../JSON/AnnounceImage.json';
import { Header } from '../common';
import Titan from '../../images/titanT.png';

const data = Info;
const numColumns = 2;

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
          style={styles.image}
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
    margin: 5,
    // borderRadius: 1,
    // borderWidth: 1,
    // borderColor: 'black'
  }
};

export default List;
