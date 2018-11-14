/**
* Date: 11/3/18
* Authors: Jamie Maddock && Matt Peters
*/
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import { LoginForm, Spinner, Button } from './common';
import AddContent from './AddStuff/AddContent';
import AddEvent from './AddStuff/AddEvent';
import UsersAnnouncements from './UsersAnnouncements';

class Admin extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderHome() {
      return (
        <View style={{ flex: 1, backgroundColor: '#FEFEFC' }}>
          <Text style={styles.description} >
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
            onPress={() => firebase.auth().signOut()}
          >
            Log Out
          </Button>
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
    console.log(this.state);
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

const AdminStack = createStackNavigator({
  AdminHome: Admin,
  Announce: AddContent,
  Event: AddEvent,
  UsersAnnouncements,
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.routeName
    }),
    headerLayoutPreset: 'center'
});

export default AdminStack;
