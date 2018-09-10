import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Entypo } from 'react-native-vector-icons/Entypo';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';

const HomeStack = createStackNavigator({
  Home: HomePage
});

const MenuStack = createStackNavigator({
  Menu: MenuPage
});

const RootStack = createBottomTabNavigator({
    Home: HomeStack,
    Menu: MenuStack
  }, {
    initalRouteName: 'HomeStack',
    tabBarOptions: { activeTintColor: 'tomato', inactiveTintColor: 'gray', },
    navigation: ({ navigation }) => ({
        tabBarIcon: <Image source="https://schoolassets.s3.amazonaws.com/logos/21551/21551.png" />
      })
  }
);

/*
const { routeName } = navigation.state;
let iconName;
if (routeName === 'Home') {
  iconName = `Home${focused ? '' : '-outline'}`;
  console.log('home');
} else if (routeName === 'Menu') {
  iconName = `Menu${focused ? '' : '-outline'}`;
  console.log('menu');
} else {
  console.log('else');
}

// You can return any component that you like here! We usually use an
// icon component from react-native-vector-icons
return <Entypo name={iconName} size={25} color={tintColor} />;
*/
export default class App extends Component {
  render() {
    return (
     <RootStack />
    );
  }
}
