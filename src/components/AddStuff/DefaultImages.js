import React, { Component } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Info from '../../JSON/AnnounceImage.json';
import { Header, Button } from '../common';
import Titan from '../../images/titanT.png';

const data = Info;
const numColumns = 2;

class List extends Component {
  state = { headerText: 'Images', Selected: '' };

  renderItem({ item }) {
    const { key, uri, text } = item;
    return (
      <View style={styles.listItem}>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={{ uri }}
        />
      <Button
        buttonStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={() => this.setState({ headerText: text, Selected: key })}
      >
        {text}
      </Button>
      </View>
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
    height: 200,
    width: 200,
    alignSelf: 'center'
  },
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
    textDecorationLine: 'underline',
    alignSelf: 'center',
    fontSize: 24,
    padding: 0,
  }
};

export default List;
