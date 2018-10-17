import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomePageItems from './HomePageItems';
import LogoTitans from '../images/logoTitans.jpg';

const HomePage = () => (
  <HomePageItems />
);

const HomeStack = createStackNavigator({
  Home: HomePage
}, {
  headerLayoutPreset: 'center',
  navigationOptions: {
    headerTitle:
      <Image
        style={{ height: 60, width: 110 }}
        source={LogoTitans}
      />,
    headerStyle: {
      height: 65
    }
  }
});


export default HomeStack;
