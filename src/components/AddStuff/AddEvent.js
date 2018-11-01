/**
* Date: 11/01/2018
* Author: Jamie Maddock
*/
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Calendar } from 'react-native-calendars';

import { CardSection, Input } from '../common';

class AddEvent extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
       <Calendar />
       <CardSection style={{ flexDirection: 'row' }}>
        <Text> Title: </Text>
        <Input label="Event Name" />
       </CardSection>
       <CardSection style={{ flexDirection: 'row' }}>
        <Text>Location: </Text>
        <Input label="e.g. B130, Auditorium" />
       </CardSection>
       <CardSection>
        <Input label="Describe this event" />
       </CardSection>
      </View>
    );
  }
}

export default AddEvent;
