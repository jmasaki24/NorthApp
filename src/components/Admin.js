import React, { Component } from 'react';
import firebase from 'firebase';
import { LoginForm, Spinner } from './common';
import AddContent from './AddStuff/AddContent';


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
