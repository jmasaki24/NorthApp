/**
* Date: 11/3/18
* Authors: Jamie Maddock && Matt Peters
*/
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import firebase from 'firebase';
import { Button, LoginForm, Spinner, } from '../common';

class Admin extends Component {
  state = { loggedIn: null, u: 'Loading...' }

// this whole mess is to try and display a username if you're logged in. not needed...
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
        // console.log(this.state.u);
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderHome() {
      return (
        <View style={{ flex: 1, backgroundColor: '#FEFEFC' }}>
          <Text style={styles.titleText}>Admin Home</Text>
          <ScrollView>
            <Text style={styles.description}>
              Hi there. This is the admin page. From here you can add an announcement
              to the homepage, or add an event to the calendar. If you need help,
              feel free to send an email to northcodingteam@gmail.com
            </Text>
            <Button
              buttonStyle={[styles.buttonStyle, { borderTopWidth: 1 }]}
              textStyle={styles.textStyle}
              onPress={() => this.props.navigation.navigate('CreateAnnounce')}
            >
              Create Announcement
            </Button>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => this.props.navigation.navigate('CreateEvent')}
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

const styles = StyleSheet.create({
  buttonStyle: {
    //borderColor: 'white',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 0,
    paddingLeft: 10,
    margin: 0,
    flex: 0,
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 18,
    margin: 5,
  },
  description: {
    fontSize: 20,
    margin: 10,
  },
  titleText: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 30,
  }
});

export { Admin };
