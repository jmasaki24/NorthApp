import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import firebase from 'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './components/HomePage';
import MenuStack from './components/MenuPage';
import CalendarStack from './components/Calendar';
import SearchStack from './components/SearchPage';

const RootStack = createBottomTabNavigator({
    Home: HomeStack,
    Search: SearchStack,
    Calendar: CalendarStack,
    Menu: MenuStack,
  }, {
    initalRouteName: 'Menu',
    tabBarOptions: { activeTintColor: 'black', inactiveTintColor: 'gray', },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = '';
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Search') {
          iconName = 'search';
        } else if (routeName === 'Calendar') {
          iconName = 'calendar-alt';
        } else if (routeName === 'Menu') {
          iconName = 'bars';
        } else {
          iconName = 'question';
        }
      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <FontAwesome5 name={iconName} size={25} color={tintColor} />;
    }
  })
});

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBL4uf8wErrDlSaJndsu9jn_SnYM-ldt78',
      authDomain: 'napp-4f332.firebaseapp.com',
      databaseURL: 'https://napp-4f332.firebaseio.com',
      projectId: 'napp-4f3322',
      storageBucket: 'napp-4f332.appspot.com',
      messagingSenderId: '687322625517'
    });
  }

  render() {
    return <RootStack />;
  }
}
