/**
* Date: 11/01/2018
* Author: Jamie Maddock
*/

import React, { Component } from 'react';
import {
  Animated, Dimensions, Easing, Modal, Picker, SafeAreaView,
  ScrollView, StyleSheet, Switch, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Calendar } from 'react-native-calendars';
import {
  addEventDate, addEventTitle, addEventLocation, addEventInfo,
  addEventHour, addEventMinute, addEventPeriod, pushEvent, isEventPushing,
} from '../../actions';
import { Button, CardSection, Confirm, Input, Spinner } from '../common';

const { height } = Dimensions.get('window');

class CEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showCalendar: false,
      switch: false,
      failMsgHeight: new Animated.Value(0),
      waitModalVisible: this.props.isPushingE,
    };
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onInfoChange = this.onInfoChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.onMinuteChange = this.onMinuteChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
  }

  onAccept() {
    const { date, title, location, info, hour, minute, period } = this.props;
    this.props.isEventPushing(true);
    this.props.pushEvent({ date, title, location, info, hour, minute, period });
    this.setState({ showModal: false });
  }

  onDecline() { this.setState({ showModal: false }); }

  onDateChange(day) { this.props.addEventDate(day.dateString); }

  onTitleChange(text) { this.props.addEventTitle(text); }

  onLocationChange(text) { this.props.addEventLocation(text); }

  onInfoChange(text) { this.props.addEventInfo(text); }

  onHourChange(hour) { this.props.addEventHour(hour); }

  onMinuteChange(minute) { this.props.addEventMinute(minute); }

  onPeriodChange(p) { this.props.addEventPeriod(p); }

  onSwitchChange(bool) {
    // temp for when you switch off All Day it remembers where you were
    const h = this.props.hour;
    const m = this.props.minute;
    const p = this.props.period;

    if (bool) {
      this.props.addEventHour('All Day');
    } else {
      this.props.addEventHour(h);
      this.props.addEventMinute(m);
      this.props.addEventPeriod(p);
    }
    this.setState({ switch: bool });
  }

  selectTime() {
    if (!this.state.switch) {
      return (
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <Picker
            onValueChange={this.onHourChange}
            selectedValue={this.props.hour}
            style={{ flex: 1, marginLeft: 30 }}
            enabled={!this.state.switch}
          >
            <Picker.Item label="1" value="01" /><Picker.Item label="2" value="02" />
            <Picker.Item label="3" value="03" /><Picker.Item label="4" value="04" />
            <Picker.Item label="5" value="05" /><Picker.Item label="6" value="06" />
            <Picker.Item label="7" value="07" /><Picker.Item label="8" value="08" />
            <Picker.Item label="9" value="09" /><Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
          </Picker>
          <Picker
            onValueChange={this.onMinuteChange}
            selectedValue={this.props.minute}
            style={{ flex: 1 }}
            enabled={!this.state.switch}
          >
            <Picker.Item label="00" value="00" /><Picker.Item label="05" value="05" />
            <Picker.Item label="10" value="10" /><Picker.Item label="15" value="15" />
            <Picker.Item label="20" value="20" /><Picker.Item label="25" value="25" />
            <Picker.Item label="30" value="30" /><Picker.Item label="35" value="35" />
            <Picker.Item label="40" value="40" /><Picker.Item label="45" value="45" />
            <Picker.Item label="50" value="50" /><Picker.Item label="55" value="55" />
          </Picker>
          <Picker
            onValueChange={this.onPeriodChange}
            selectedValue={this.props.period}
            style={{ flex: 1 }}
            enabled={!this.state.switch}
          >
            <Picker.Item label="AM" value='AM' />
            <Picker.Item label="PM" value='PM' />
          </Picker>
        </View>
      );
    }
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
    if (this.props.title && this.props.date) {
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
    return (
      <CardSection>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Create Event</Text>
        </View>
      </CardSection>
    );
  }

  render() {
    const { failMsgHeight } = this.state;
    if (this.props.error) {
      // animate the showing of the failMSG
      failMsgHeight.setValue(0); // reset the animated value
      Animated.timing(failMsgHeight, {
        toValue: (height / 20), // proportional error msg
        duration: 1000,
        easing: Easing.cubic,
      }).start();
    } else {
      // animate the hiding of the failMSG
      Animated.timing(failMsgHeight, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
      }).start();
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        <Animated.View style={{ backgroundColor: '#ff0f0f', height: failMsgHeight }}>
          <Text style={{ color: 'white', fontSize: 20, margin: 5, alignSelf: 'center' }}>
            Error: Could not push
          </Text>
        </Animated.View>
        {this.renderCalendar()}
        <Input
          label='Title:'
          placeholder="Event Name"
          blurOnSubmit
          inputFlexNum={4}
          multiline
          onChangeText={this.onTitleChange}
          returnKeyType="done"
          value={this.props.title}
        />
        <CardSection style={styles.inputSection}>
          <Text style={styles.labelStyle}>Date:</Text>
          <Text style={styles.dateText}>{this.props.date}</Text>
          <Button
            onPress={() => this.setState({ showCalendar: !this.state.showCalendar })}
            buttonStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1.2 }}
          >
            Select Date
          </Button>
        </CardSection>
        {this.selectTime()}
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ flex: 0, paddingLeft: 10 }}>All Day?</Text>
          <Switch
            onValueChange={this.onSwitchChange}
            value={this.state.switch}
            style={{ flex: 0 }}
            thumbColor='#02BAFB'
            trackColor={{ true: '#B9D6F2' }}
          />
        </CardSection>
        <Input
          placeholder="e.g. B130, Auditorium"
          label='Location:'
          blurOnSubmit
          inputFlexNum={3}
          multiline
          onChangeText={this.onLocationChange}
          returnKeyType="done"
          value={this.props.location}
        />
        <Input
          placeholder="Describe this event"
          label='Desciption:'
          blurOnSubmit
          inputFlexNum={3}
          multiline
          onChangeText={this.onInfoChange}
          returnKeyType="done"
          value={this.props.info}
        />
        {this.renderButton()}
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Are you sure you would like to add this event?
        </Confirm>
        <Modal
          visible={this.state.waitModalVisible}
          transparent
          onRequestClose={() => this.props.isEventPushing(false)}
        >
          <SafeAreaView style={styles.waitModalViewStyle}>
            <View style={{ alignSelf: 'center', alignContent: 'center', height: 100 }}>
              <Spinner style={{ flex: -1 }} />
              <View style={{ flex: -1 }}>
                <Text style={{ fontSize: 20, color: 'lightgrey' }}>Please Wait...</Text>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  dateText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    color: 'black',
  },
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    borderWidth: null,
    backgroundColor: 'white',
    borderRadius: 0,
    paddingLeft: 10,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  waitModalViewStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 20,
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  const { date, title, location, info, isPushingE, hour, minute, period, error } = state.event;
  return { date, title, location, info, isPushingE, hour, minute, period, error };
};

const CreateEvent = withNavigation(connect(mapStateToProps, {
  addEventDate,
  addEventTitle,
  addEventHour,
  addEventMinute,
  addEventPeriod,
  addEventLocation,
  addEventInfo,
  pushEvent,
  isEventPushing,
})(CEvent));

export { CreateEvent };