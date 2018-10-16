import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { LoginForm, Spinner, Button } from './common';
import AddContent from './AddContent';

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
   renderContent() {
    switch (this.state.LoggedIn) {
      case true:
        return (
          <AddContent />
        );
      case false:
        return <LoginForm />;
      default:
        return <LoginForm />;
    }
  }
   render() {
    return this.renderContent();
  }
}
 export default Admin;
