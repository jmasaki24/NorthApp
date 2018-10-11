import React, { Component } from 'react';
import { View } from 'react-native'
import { Spinner, Header } from '../common';
import CameraRollPicker from 'react-native-camera-roll-multi-picker';

class Photos extends Component {
  nothing() {
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText='Photos' />
        <CameraRollPicker
          callback={() => this.nothing()}
          assetTypes='Photos'
          selectSingleItem
          backgroundColor='#eee'
          loader=<Spinner size='large' />
        />
      </View>
    );
  }
}

export default Photos;
