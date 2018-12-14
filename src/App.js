import React, { Component } from 'react';
import firebase from '@firebase/app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createBottomTabNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME, FB_API_KEY, FB_PROJECT_ID,
FB_AUTH_DOMAIN, FB_DATABASE_URL, FB_STORAGE_BUCKET, FB_MESSAGING_SENDER_ID }
  from 'react-native-dotenv';

import fbConfig from '../../firebaseConfigInfo.json';

import reducers from './reducers';
import HomeStack from './components/HomePage';
import MenuStack from './components/MenuPage';
import CalendarStack from './components/Calendar';
import SearchStack from './components/SearchPage';

// configure firebase
firebase.initializeApp({
  apiKey: fbConfig.apiKey,
  authDomain: fbConfig.authDomain,
  databaseURL: fbConfig.databaseURL,
  projectId: fbConfig.projectId,
  storageBucket: fbConfig.storageBucket,
  messagingSenderId: fbConfig.messagingSenderId,
});
const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY
);
const index = algolia.initIndex(ALGOLIA_INDEX_NAME);

// Get all contacts from Firebase
// probably should only be done after adding or editing an item
database.ref('/Announcements').once('value', announcements => {
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

database.ref('/Calendar').once('value', calendar => {
  // Build an array of all records to push to Algolia
  const records = [];
  calendar.forEach(date => {
      for (const event in calendar.val()[date.key]) {
        if (calendar.val()[date.key].hasOwnProperty(event)) {
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
