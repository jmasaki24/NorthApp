import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import pinkBapeT from '../images/pinkBapeT.jpg';
import { Card } from './common';

const SizeSquare = ({ size }) => {
  return (
    <View style={styles.sizeSquareStyle}>
      <Text style={{ fontSize: 20, color: '#000' }}> {size} </Text>
    </View>
  );
};


class StoreItem extends Component {
  render() {
    return (
      <View style={{ flex: 1, }}>
        <Image
          resizeMode="contain"
          style={{ flex: 2, maxHeight: 350, width: undefined, borderWidth: 3, borderColor: '#0dd' }}
          source={pinkBapeT}
        />
        <Card style={{ padding: 15 }}>
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

const styles = {
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
    marginRight: 2.5
  }
};

export default StoreItem;
