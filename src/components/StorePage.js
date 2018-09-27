import React, { Component } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StoreItem from './StoreItem';
import StoreItems from '../JSON/storeItems.json';

//remove this after updating to a stable release of react native
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

const data = StoreItems;
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
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Item')}

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
        renderItem={item => this.renderItem(item, this.props.navigation)}
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
  Item: StoreItem
},
{
  headerLayoutPreset: 'center',
  navigationOptions: {
    headerTitle:
      <Text style={{ fontSize: 18, alignSelf: 'center', }}>T-Stop Apparrel Store</Text>,
    headerBackImage:
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome5 style={{ marginRight: 3 }} name={'caret-left'} color={'black'} size={33} />
        <FontAwesome5 name={'store-alt'} color={'black'} size={20} />
      </View>
  }
});

export default StoreStack;
