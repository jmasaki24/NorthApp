/**
* Author: Matt Peters
*/

import React from 'react';
import { Image, TouchableOpacity, } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomePageItems from './HomePageItems';
import Licenses from '../Licenses/Licenses';

const HomePage = () => (
  <HomePageItems />
);

const HomeStack = createStackNavigator({
  Home: HomePage,
  Licenses,
}, {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({ navigation }) => ({
    headerTitle:
      <TouchableOpacity
        onPress={() => navigation.navigate('Licenses')}
      >
        <Image
          style={{ resizeMode: 'contain', height: 60, width: 110 }}
          source={require('../images/logoTitans.jpg')}
        />
      </TouchableOpacity>,
    headerStyle: {
      height: 65
    },
    headerBackTitle: null, // for iOS
    headerBackImage:
          <Icon style={{ paddingLeft: 5 }} name={'arrow-left'} size={25} color={'black'} />,
    gesturesEnabled: true
  })
});


export default HomeStack;
