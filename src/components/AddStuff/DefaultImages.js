import React, { Component } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Info from '../../JSON/AnnounceImage.json';
<<<<<<< HEAD
import { Header, Button } from '../common';
=======
import { Header } from '../common';
>>>>>>> ef21a51f8dd2bf60b0b04e85cddbaadd2f0349d9
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
<<<<<<< HEAD
  buttonContainer: {
    flex: 0.15,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#eee',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#000',
    alignSelf: 'center',
    fontSize: 24,
    padding: 0,
=======
  touchStyle: {
    flex: 1,
    alignSelf: 'center',
    margin: 5,
    // borderRadius: 1,
    // borderWidth: 1,
    // borderColor: 'black'
>>>>>>> ef21a51f8dd2bf60b0b04e85cddbaadd2f0349d9
  }
};

export default List;
