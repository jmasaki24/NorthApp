import React, { Component } from 'react';
import firebase from 'firebase';
import { LoginForm, Spinner } from './common';
import AddContent from './AddContent';


class Admin extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBL4uf8wErrDlSaJndsu9jn_SnYM-ldt78',
      authDomain: 'napp-4f332.firebaseapp.com',
      databaseURL: 'https://napp-4f332.firebaseio.com',
      projectId: 'napp-4f3322',
      storageBucket: 'napp-4f332.appspot.com',
      messagingSenderId: '687322625517'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <AddContent />;
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

export default Admin;
