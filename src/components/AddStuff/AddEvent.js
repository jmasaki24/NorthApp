/**
* Date: 11/01/2018
* Author: Jamie Maddock
*/
import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Calendar } from 'react-native-calendars';

import { CardSection, Input, Button, Confirm } from '../common';

class AddEvent extends Component {
  state = { showModal: false }

  onAccept() {
      const { date, title, location, description } = this.props;
  }

  onDecline() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
       <Calendar />
       <CardSection style={styles.inputSection}>
        <Input placeholder="Event Name" label='Title:' />
       </CardSection>
       <CardSection style={styles.inputSection}>
        <Input placeholder="e.g. B130, Auditorium" label='Location:' />
       </CardSection>
       <CardSection style={styles.inputSection} >
        <Input placeholder="Describe this event" label='Desciption:' />
       </CardSection>
       <Button
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonStyle}
       >
       Add Event To Calendar
       </Button>

       <Confirm
         visible={this.state.showModal}
         onDecline={this.onDecline.bind(this)}
       >
         Are you sure you would like to add this event?
       </Confirm>
      </ScrollView>
    );
  }
}

const styles = {
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonStyle: {
    flex: 1,
    borderWidth: null,
    backgroundColor: 'white',
    borderRadius: 0,
    paddingLeft: 10,
    margin: 0
  },
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 18,
    margin: 5
  }
};

export default AddEvent;
