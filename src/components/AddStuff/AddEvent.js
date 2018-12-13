/**
* Date: 11/01/2018
* Author: Jamie Maddock
*/

import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Calendar } from 'react-native-calendars';
import { addEventDate, addEventTitle, addEventLocation, addEventInfo, pushEvent }
  from '../../actions';

import { CardSection, Input, Button, Confirm, } from '../common';

class AddEvent extends Component {
  state = { showModal: false, showCalendar: false }

  onAccept() {
      const { date, title, location, info } = this.props;
      this.props.pushEvent({ date, title, location, info });
      this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onDateChange(day) {
    console.log(day.dateString);
    this.props.addEventDate(day.dateString);
  }

  onTitleChange(text) {
    this.props.addEventTitle(text);
  }

  onLocationChange(text) {
    this.props.addEventLocation(text);
  }

  onInfoChange(text) {
    this.props.addEventInfo(text);
  }

  renderCalendar() {
    if (this.state.showCalendar) {
      return (
        <Calendar
           onDayPress={(day) => {
             this.onDateChange(day);
             this.setState({ showCalendar: false });
           }}
        />
      );
    }
  }

  renderButton() {
    if (this.props.title === '' || this.props.info === '') {
      return (
        <CardSection>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Create Event</Text>
          </View>
        </CardSection>
      );
    }
      return (
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black', alignSelf: 'center' }}
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            Create Event
          </Button>
        </CardSection>
      );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
       {this.renderCalendar()}
       <CardSection style={styles.inputSection}>
        <Input
          placeholder="Event Name"
          label='Title:'
          onChangeText={this.onTitleChange.bind(this)}
          value={this.props.title}
        />
       </CardSection>
       <CardSection style={styles.inputSection}>
          <Text style={styles.dateText}>Date:</Text>
          <Text style={styles.dateText}>{this.props.date}</Text>
        <Button
          onPress={() => this.setState({ showCalendar: !this.state.showCalendar })}
          buttonStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
          Select Date
        </Button>
       </CardSection>
       <CardSection style={styles.inputSection}>
        <Input
          placeholder="e.g. B130, Auditorium"
          label='Location:'
          onChangeText={this.onLocationChange.bind(this)}
          value={this.props.location}
        />
       </CardSection>
       <CardSection style={styles.inputSection}>
        <Input
          placeholder="Describe this event"
          label='Desciption:'
          onChangeText={this.onInfoChange.bind(this)}
          value={this.props.info}
        />
       </CardSection>
       {this.renderButton()}

       <Confirm
         visible={this.state.showModal}
         onAccept={this.onAccept.bind(this)}
         onDecline={this.onDecline.bind(this)}
       >
         Are you sure you would like to add this event?
       </Confirm>
      </ScrollView>
    );
  }
}

const styles = {
  dateText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 18,
    color: 'black'
  },
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
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1
  },
};

const mapStateToProps = (state) => {
  const { date, title, location, info, pushing } = state.event;
  console.log(state.event);
  return { date, title, location, info, pushing };
};

export default withNavigation(connect(mapStateToProps, {
  addEventDate,
  addEventTitle,
  addEventLocation,
  addEventInfo,
  pushEvent
})(AddEvent));
