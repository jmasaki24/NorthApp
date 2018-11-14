/**
 * Date: 11/09/2018
 *  Author: Jamie Maddock
*/
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase';

class UsersEvents extends Component {
  constructor() {
    super();
    this.state = { eventArray: {} };
  }

  getUsersEvents() {
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    let firebaseData = {};
    return (
      firebase.database().ref(`/Users/${uid}/Events`)
        .on('value', snapshot => {
          firebaseData = snapshot.val();
          this.setState({ eventArray: Object.values(firebaseData) });
          console.log(this.state.eventArray);
        })
    );
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: 90 }]}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        renderItem={this.renderItem}
        data={this.state.eventArray}
      />
    );
  }
}

const styles = {
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
};

export default UsersEvents;
