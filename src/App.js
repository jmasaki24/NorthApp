import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import firebase from 'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './components/HomePage';
import MenuStack from './components/MenuPage';
import CalendarStack from './components/Calendar';

const RootStack = createBottomTabNavigator({
    Home: HomeStack,
    Calendar: CalendarStack,
    Menu: MenuStack,
  }, {
    initalRouteName: 'Menu',
    tabBarOptions: { activeTintColor: 'blue', inactiveTintColor: 'gray', showIcon: true, },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName = '';
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Calendar') {
          iconName = 'calendar-alt';
        } else if (routeName === 'Menu') {
          iconName = 'list';
        } else {
          iconName = 'question';
        }
      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <FontAwesome5 name={iconName} size={25} color={'black'} />;
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
