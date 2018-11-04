import React, { Component } from 'react';
import firebase from '@firebase/app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createBottomTabNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import fbConfig from '../../firebaseConfigInfo.json';

import reducers from './reducers';
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
      apiKey: fbConfig.apiKey,
      authDomain: fbConfig.authDomain,
      databaseURL: fbConfig.databaseURL,
      projectId: fbConfig.projectId,
      storageBucket: fbConfig.storageBucket,
      messagingSenderId: fbConfig.messagingSenderId,
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
