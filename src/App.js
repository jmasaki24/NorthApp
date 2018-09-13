import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import ContactPage from './components/ContactPage';
import Calendar from './components/Calendar';

const HomeStack = createStackNavigator({
  Home: HomePage
});

const CalendarStack = createStackNavigator({
  Calendar
});

const MenuStack = createStackNavigator({
  Menu: MenuPage
});

const RootStack = createBottomTabNavigator({
    Home: HomeStack,
    Calendar: CalendarStack,
    Menu: MenuStack,
    Contact: ContactPage
  }, {
    initalRouteName: 'ContactPage',
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
        } else if (routeName === 'Contact') {
          iconName = 'info-circle';
        } else {
          iconName = 'dribbble';
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <FontAwesome5 name={iconName} size={25} color={'blue'} />;
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
