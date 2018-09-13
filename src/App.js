import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import ContactPage from './components/ContactPage';
import AcademicsPage from './components/AcademicsPage';
import Calendar from './components/Calendar';

const HomeStack = createStackNavigator({
  Home: HomePage
});

const CalendarStack = createStackNavigator({
  Calendar
});

const MenuStack = createStackNavigator({
  Menu: MenuPage,
  Contact: ContactPage,
  Academics: AcademicsPage
});

const RootStack = createBottomTabNavigator({
    Home: HomeStack,
    Calendar: CalendarStack,
    Menu: MenuStack,
  }, {
    initalRouteName: 'Contact',
    tabBarOptions: { activeTintColor: 'blue', inactiveTintColor: 'gray', showIcon: true, },
    headerTitle: <HeaderImage />,
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
        return <FontAwesome5 name={iconName} size={25} color={'blue'} />;
      }
    })
  });

class HeaderImage extends Component {
  render() {
    return (
      <View>
        <Image
          source={{ uri: 'https://schoolassets.s3.amazonaws.com/logos/21551/21551.png' }}
          style={{ height: 15, width: 15 }}
        />
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
