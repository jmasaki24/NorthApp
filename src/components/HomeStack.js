/**
* Author: Matt Peters
*/

import React from 'react';
import { Image, TouchableOpacity, } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomePageItems from './HomePageItems';
import LogoTitans from '../images/logoTitans.jpg';
import Certificates from './Certificates';

const HomePage = () => (
  <HomePageItems />
);

const HomeStack = createStackNavigator({
  Home: HomePage,
  Certificates,
}, {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: ({ navigation }) => ({
    headerTitle:
      <TouchableOpacity
        onPress={() => navigation.navigate('Certificates')}
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
