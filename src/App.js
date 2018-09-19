import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import ContactPage from './components/ContactPage';
import AcademicsPage from './components/AcademicsPage';
import AdminPage from './components/Admin';
import ClubsPage from './components/Clubs';
import Calendar from './components/Calendar';
import StorePage from './components/StorePage';
import BellSchedule from './components/Bells';
import Titan from './titanT.png';

const HomeStack = createStackNavigator({
  Home: HomePage
}, {
  navigationOptions: {
    headerTitle:
    <Image
      source={Titan}
      style={{ height: 40, width: 40 }}
    />
  }
});

const CalendarStack = createStackNavigator({
  Calendar
}, {
  navigationOptions: {
    headerTitle:
    <Image
      source={Titan}
      style={{ height: 40, width: 40 }}
    />
  }
});

const MenuStack = createStackNavigator({
  Menu: MenuPage,
  Contact: ContactPage,
  Academics: AcademicsPage,
  Clubs: ClubsPage,
  Admin: AdminPage,
  Bells: BellSchedule
}, {
  navigationOptions: {
    headerTitle:
    <Image
      source={Titan}
      style={{ height: 40, width: 40 }}
    />
  }
});

const StoreStack = createStackNavigator({
  Store: StorePage
}, {
  navigationOptions: {
    headerTitle:
    <Image
      source={Titan}
      style={{ height: 40, width: 40 }}
    />,
    headerTitleStyle: { paddingBottom: 10, borderBottomWidth: 10 }
  }
});

const RootStack = createBottomTabNavigator({
    Home: HomeStack,
    Store: StoreStack,
    Calendar: CalendarStack,
    Menu: MenuStack,
  }, {
    initalRouteName: 'Contact',
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

const T = () => (
  <Image
    source={Titan}
    style={{ height: 40, width: 40 }}
  />
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
