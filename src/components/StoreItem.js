import React, { Component } from 'react';
import { View, Picker, Image, FlatList, Text } from 'react-native';

class StoreItem extends Component {
  render() {
    const { uri } = this.props.data;

    return (
      <View>
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{ uri }}
        />
      </View>
    );
  }
}

const styles = {
  image: { flex: 1 }
};

export default StoreItem;
