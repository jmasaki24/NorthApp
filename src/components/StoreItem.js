import React, { Component } from 'react';
import { Text, Picker, ScrollView, Image } from 'react-native';
import Titan from '../images/titanT.png';

class StorePage extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Image
          style={{ flex: 1 }}
          source={Titan}
        />
        <Text style={styles.textStyle}> Patchwork Rugby Hoodie </Text>
        <Picker
          style={{ flex: 1 }}
        >
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 16,
    color: '#000',
  }
};

export default StorePage;
