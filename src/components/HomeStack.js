/**
* Author: Matt Peters
*/

import React from 'react';
import { Image, TouchableOpacity, } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomePageItems from './HomePageItems';
import LogoTitans from '../images/logoTitans.jpg';
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
          style={{ height: 60, width: 110 }}
          source={LogoTitans}
        />
      </TouchableOpacity>,
    headerStyle: {
      height: 65
    }
  })
});


export default HomeStack;
