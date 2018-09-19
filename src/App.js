import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeStack from './components/HomePage';
import MenuStack from './components/MenuPage';
import CalendarStack from './components/Calendar';
import StoreStack from './components/StorePage';

const RootStack = createBottomTabNavigator({
    //Store: StoreStack,
    Home: HomeStack,
    Calendar: CalendarStack,
    Menu: MenuStack,
  }, {
    initalRouteName: 'HomeStack',
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
  render() {
    return <RootStack />;
  }
}
