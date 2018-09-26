import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import Titan from '../../images/titanT.png';
import Info from '../../JSON/AnnounceImage.json';

//const data = Info;
const numColumns = 2;

class DefaultImages extends Component {
  state = { imageSelected: '' };

  renderImages(image) {
    const { key, uri, text } = image;
    return (
      <View style={styles.listItem}>
        <Image
          resizeMode='center'
          style={styles.imageStyle}
          source={{ uri }}
        />
        <Text style={styles.textStyle}>
          {text}
        </Text>
      </View>
    );
  }

  render() {
    return (
        <FlatList
          style={styles.listStyle}
          data={Info}
          renderItem={(image) => this.renderImages(image)}
          numColumns={numColumns}
        />
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  listStyle: {
    flex: 1,
    //backgroundColor: 'white'
  },
  imageStyle: {
    flex: 1
  },
  textStyle: {
    fontSize: 16,
    alignSelf: 'center'
  }
};

export default DefaultImages;
