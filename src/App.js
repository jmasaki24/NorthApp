import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
//import { Entypo } from 'react-native-vector-icons/Entypo';
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
  },
  {
    //initialRouteName: HomeStack
  },
);

/*
{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
*/

export default class App extends Component {
  render() {
    return (
     <RootStack />
    );
  }
}
