import React, { Component } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ContactPage from './ContactPage';

//remove this after updating to a stable release of react native
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

const data = [
  { key: 'Patchwork Rugby Hoodie',
  price: '$248',
  uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302885_lifestyle?$rl_392_pdp$', },
  { key: 'Classic Cotton Rugby Shirt',
  price: '$168',
  uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302897_lifestyle?$rl_392_pdp$' },
  { key: 'Cotton Blend Fleece Sweatshirt',
  price: '$188',
  uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302871_lifestyle?$rl_392_pdp$' },
  { key: 'Cotton Blend Fleece Cardigan',
  price: '$248',
  uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302888_lifestyle?$rl_392_pdp$' },
  { key: 'Cotton Blend Fleece Hoodie',
  price: '$148',
  uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302907_lifestyle?$rl_392_pdp$' },
  { key: 'Patchwork Fleece Jogger',
  price: '$198',
  uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302901_lifestyle?$rl_392_pdp$' }
];

const numColumns = 2;

class StorePage extends Component {
  renderItem({ item }) {
    const { key, price, uri } = item;
    return (
      <View
        style={styles.listItem}
      >
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{ uri }}
        />
        <Text style={styles.text}>{key}</Text>
        <Text style={styles.text}>{price}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Contact')}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={data}
        renderItem={this.renderItem}
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
    minWidth: 170,
    maxWidth: 223,
    height: 304,
    maxHeight: 304,
    backgroundColor: '#e8e8e8',
  },
  list: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    borderRadius: 0,
    backgroundColor: null,
    margin: 0,
    alignItems: 'center'
  },
  buttonText: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 12,
    padding: 0,
  }
};

const StoreStack = createStackNavigator({
  Store: StorePage,
  Contact: ContactPage
}, {
});

export default StoreStack;
