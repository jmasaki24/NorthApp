import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
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
    initalRouteName: 'MenuStack',
    tabBarOptions: { activeTintColor: 'blue', inactiveTintColor: 'gray', showIcon: true, },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HomeStack') {
          iconName = 'home';
        } else if (routeName === 'MenuStack') {
          iconName = 'menu';
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Entypo name={iconName} size={25} color={'blue'} />;
      }
    })
});

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
=======
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
