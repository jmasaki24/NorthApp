import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import { LoginForm, Spinner, Button } from './common';
import AddContent from './AddStuff/AddContent';
import AddEvent from './AddStuff/AddEvent';

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
        <View style={{ flex: 1 }}>
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
    justifyContent: 'center'
  },
  textStyle: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 18,
    margin: 5
  }
};

const AdminStack = createStackNavigator({
  AdminHome: Admin,
  Announce: AddContent,
  Event: AddEvent
  },
//   {
//     navigationOptions: ({ navigation }) => {
//       title: () => {
//         const routeName = navigation.state;
//         switch (routeName) {
//           case (AdminHome):
//             return 'Admin';
//           case (Announce):
//             return ''
//         }
//       }
//     }
//     headerLayoutPreset: 'center'
// }
);

export default AdminStack;
