import React, { Component } from 'react';
import firebase from '@firebase/app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNLanguages from 'react-native-languages';
import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME, FB_API_KEY, FB_PROJECT_ID,
FB_AUTH_DOMAIN, FB_DATABASE_URL, FB_STORAGE_BUCKET, FB_MESSAGING_SENDER_ID }
  from 'react-native-dotenv';
import i18n from './utils/i18n.js';

import reducers from './reducers';
import HomeStack from './components/HomeStack';
import MenuStack from './components/MenuPage';
import CalendarStack from './components/CalendarStack';
import SearchStack from './components/SearchPage';

// configure firebase, want to use dotenv but not sure if it works
firebase.initializeApp({
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DATABASE_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
});
const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY
);
const index = algolia.initIndex(ALGOLIA_INDEX_NAME);

// Get all announcements and events from Firebase
// probably should only be done after adding or editing an item,
database.ref('/Announcements').on('value', announcements => {
  // Build an array of all records to push to Algolia
  const records = [];
  announcements.forEach(announcement => {
    // get the key and data from the snapshot
    const childKey = announcement.key;
    const childData = announcement.val();
    // We set the Algolia objectID as the Firebase .key
    childData.objectID = childKey;
    // Add object for indexing
    records.push(childData);
  });

  // Add or update new objects
  index
    .saveObjects(records)
    .then(() => {
      console.log('Announcements imported into Algolia');
    })
    .catch(error => {
      console.error('Error when importing announcement into Algolia', error);
      process.exit(1);
    });
});

database.ref('/Calendar').on('value', calendar => {
  // Build an array of all records to push to Algolia
  const records = [];
  calendar.forEach(date => {
      for (const event in calendar.val()[date.key]) {
        const has = calendar.val()[date.key].hasOwnProperty;
        if (has) {
          const o = calendar.val()[date.key][event];
          o.objectID = event;
          records.push(o);
        }
      }
  });

  // Add or update new objects
  index
    .saveObjects(records)
    .then(() => {
      console.log('Calendar imported into Algolia');
    })
    .catch(error => {
      console.error('Error when importing event into Algolia', error);
      process.exit(1);
    });
});

const RootStack = createBottomTabNavigator({
    Home: HomeStack,
    Search: SearchStack,
    Calendar: CalendarStack,
    Menu: MenuStack,
  }, {
    initalRouteName: 'Menu',
    tabBarOptions: { activeTintColor: 'black', inactiveTintColor: 'gray', },
    defaultNavigationOptions: ({ navigation }) => ({
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

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  componentWillMount() {
    RNLanguages.addEventListener('change', this._onLanguagesChange);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this._onLanguagesChange);
  }

  _onLanguagesChange = ({ language }) => {
   i18n.locale = language;
  };

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
