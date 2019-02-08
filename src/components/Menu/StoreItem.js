/**
* Author: Jamie Maddock
*/

import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import firebase from 'firebase';
import { Card } from '../common';

const { height, width } = Dimensions.get('window');

//use a flatlist to render sizesquares as received by data with actions/redux later
const SizeSquare = ({ size }) => (
    <View style={styles.sizeSquareStyle}>
      <Text style={{ fontSize: 20, color: '#000' }}> {size} </Text>
    </View>
);


class StoreItem extends Component {
  constructor(props) {
    super(props);
    const item = this.props.navigation.state.params;
    this.state = { item, data: [] };
  }

  componentWillMount() {
    this.renderImages();
  }

  renderImages() {
    const item = this.props.navigation.state.params.item;
    const storage = firebase.storage();
    const array = this.state.data;
    item.colors.map(color => {
      storage.ref(`/napp_store_images/${item.image}/${color}${item.image}.jpg`)
        .getDownloadURL().then(url => {
          array.push(url);
          this.setState({ data: array });
        });
    });
    this.setState({ data: array });
  }

  renderItem(item) {
    // flatlist passes an object with item prop... not sure why
    return (
      <Image
        resizeMode="cover"
        style={styles.imageStyle}
        source={{ uri: item.item }}
      />
    );
  }

  render() {
    const { item } = this.state.item;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal
          style={{ flex: 1 }}
          data={this.state.data}
          renderItem={uri => this.renderItem(uri)}
        />
        <Card style={styles.descripStyle}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text style={{ fontSize: 18, color: '#000' }}>${item.price}</Text>
          <View style={styles.sizeRowStyle}>
            <Text style={{ fontSize: 20 }}> Available Sizes: </Text>
            <SizeSquare size='S' />
            <SizeSquare size='M' />
            <SizeSquare size='L' />
            <SizeSquare size='XL' />
            <TouchableOpacity onPress={() => Linking.openUrl('https://teespring.com/stores/real-south-boys-merch')}>
              <Text style={{ textDecorationLine: 'underline', marginLeft: 10 }}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    color: '#000',
  },
  sizeRowStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
   },
  sizeSquareStyle: {
    height: 30,
    width: 30,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2.5,
    marginRight: 2.5,
  },
  imageStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
    width,
    height: width * 0.9,
  },
  descripStyle: {
    padding: 15,
    flex: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderColor: null,
    shadowColor: null,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  }
});

export default StoreItem;
