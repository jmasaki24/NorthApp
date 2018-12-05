/**
* Date: 11/3/18
* Authors: Jamie Maddock && Matt Peters
*/
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import { LoginForm, Spinner, Button } from './common';
import AddContent from './AddStuff/AddContent';
import AddEvent from './AddStuff/AddEvent';
import UsersAnnouncements from './UsersAnnouncements';
import UsersEvents from './UsersEvents';

class Admin extends Component {
  state = { loggedIn: null, u: 'Loading...' }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
        const { currentUser } = firebase.auth();
        const uid = currentUser.uid;
        let firebaseData = {};
        firebase.database().ref(`/Users/${uid}`)
          .on('value', snapshot => {
            firebaseData = snapshot.val();
            this.setState({ u: firebaseData.Username });
          });
        console.log(this.state.u);
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderHome() {
      return (
        <View style={{ flex: 1, backgroundColor: '#FEFEFC' }}>
          <ScrollView>
            <Text style={styles.description}>
              Hi there. This is the admin page.
              From here you can add an announcement to the homepage, or add an event to the calendar.
              If you need help, feel free to send an email to northcodingteam@gmail.com
            </Text>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.props.navigation.navigate('Announce')}
            >
              Create Announcement
            </Button>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.props.navigation.navigate('Event')}
            >
              Create Event
            </Button>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.props.navigation.navigate('UsersAnnouncements')}
            >
              View Created Announcements
            </Button>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.props.navigation.navigate('UsersEvents')}
            >
              View Created Events
            </Button>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => firebase.auth().signOut()}
            >
              Log Out
            </Button>
          </ScrollView>
        </View>
      );
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return this.renderHome();
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return this.renderContent();
  }
}

const styles = {
  buttonStyle: {
    //borderColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 0,
    paddingLeft: 10,
    margin: 0,
    flex: 0,
    justifyContent: 'center'
  },
  textStyle: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 18,
    margin: 5
  },
  description: {
    fontSize: 20,
    margin: 10,
  }
};
// ES6 shortcut: when a key and its value are the same, it can be simplified e.g. UsersAnnouncements
const AdminStack = createStackNavigator({
  AdminHome: Admin,
  Announce: AddContent,
  Event: AddEvent,
  UsersAnnouncements,
  UsersEvents
  },
  {
    navigationOptions: () => ({
      // title: `${navigation.state.routeName}`  // I want to add a username somewhere on screen -JM
      header: null
    }),

});

export default AdminStack;
