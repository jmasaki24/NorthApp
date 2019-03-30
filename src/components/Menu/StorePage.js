/**
* Author: Jamie Maddock
*/

import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import StoreItem from './StoreItem';
import { Spinner } from '../common';

//remove this after updating to a stable release of react native
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

const numColumns = 2;

class StorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        t: { price: 0.0, name: 'item', uri: 'uri',
        }
      }
    };
  }

  componentWillMount() {
    this.getStore();
  }

  getStore() {
    const storage = firebase.storage();
    const array = [];
    let i = 0;
    return (
      firebase.database().ref('/Store')
      .on('value', snapshot => {
        const firebaseData = snapshot.val();
/**
*        Promise.all(Object.keys(firebaseData).map(async key => {
*          const color = firebaseData[key].colors['0'];
*          const image = firebaseData[key].image;
*          const url = await storage
*            .ref(`/napp_store_images/${firebaseData[key].image}/${color}${image}.jpg`)
*            .getDownloadURL();
*          firebaseData[key].uri = url;
*        })).then(() => {
*          this.setState({ items: firebaseData });
*        });
*/
        for (const key in firebaseData) {
          if (firebaseData[key].hasOwnProperty) {
            const color = firebaseData[key].colors['0'];
            const image = firebaseData[key].image;

            storage.ref(`/napp_store_images/${firebaseData[key].image}/${color}${image}.jpg`)
              .getDownloadURL().then(url => {
                firebaseData[key].uri = url
                array[i] = firebaseData[key];
                i++;
                this.setState({ items: array.reverse() });
              });
          }
        }
      })
    );
  }

  renderItem({ item }) {
    const { name, price, uri } = item;
    return (
      <View
        style={styles.listItem}
      >
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{ uri }}
        />
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>${price}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Item', { item })}

        >
          <Text style={styles.buttonText}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderList() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F6F8' }}>
        <FlatList
          style={styles.list}
          data={this.state.items}
          renderItem={item => this.renderItem(item, this.props.navigation)}
          numColumns={numColumns}
        />
      </View>
    );
  }

  render() {
    const { items } = this.state;
    return items[0] ? this.renderList() : (
        <Spinner />
    );
  }
}


const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    minWidth: 150,
    maxWidth: 223,
    height: 304,
    maxHeight: 304,
    backgroundColor: '#F6F6F8',
  },
  list: {
    flex: 1,
    backgroundColor: '#eee'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    borderRadius: 0,
    backgroundColor: null,
    margin: 0,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 12,
    padding: 0,
  }
});

const StoreStack = createStackNavigator({
  Store: StorePage,
  Item: StoreItem
},
{
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTitle:
      <Text style={{ fontSize: 18, alignSelf: 'center', }}>Gediyon Merch Store</Text>,
    headerBackTitle: null,
    headerBackImage:
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome5 style={{ marginRight: 3 }} name={'caret-left'} color={'black'} size={33} />
        <FontAwesome5 name={'store-alt'} color={'black'} size={20} />
      </View>,
    gesturesEnabled: true,
  }
});

export default StoreStack;
