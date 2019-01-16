/**
* Author: Jamie Maddock
*/

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import pinkBapeT from '../../images/pinkBapeT.jpg';
import { Card } from '../common';

//use a flatlist to render sizesquares as received by data with actions/redux later

const SizeSquare = ({ size }) => (
    <View style={styles.sizeSquareStyle}>
      <Text style={{ fontSize: 20, color: '#000' }}> {size} </Text>
    </View>
);


class StoreItem extends Component {
  render() {
    return (
      <View style={{ flex: 1, }}>
        <Image
          resizeMode="cover"
          style={styles.imageStyle}
          source={pinkBapeT}
        />
        <Card style={styles.descripStyle}>
          <Text style={styles.titleText}>Big Head Ape Tee Pink</Text>
          <Text style={{ fontSize: 18, color: '#000' }}> $20 </Text>
          <View style={styles.sizeRowStyle}>
            <Text style={{ fontSize: 20 }}> Available Sizes: </Text>
            <SizeSquare size='S' />
            <SizeSquare size='M' />
            <SizeSquare size='L' />
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
    flex: 2,
    maxHeight: 350,
    width: undefined,
  },
  descripStyle: {
    padding: 15,

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
