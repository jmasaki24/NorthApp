import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Agenda } from 'react-native-calendars';
import RNCalendarEvents from 'react-native-calendar-events';

class CalendarItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      refreshing: true
    };
  }

  componentWillMount() {
    this.getCalendar();
  }

  getCalendar() {
    this.setState({ refreshing: true });
    let firebaseData = {};
    firebase.database().ref('/Calendar')
      .once('value', snapshot => {
        firebaseData = snapshot.val();
        const calendarData = {};
        // looping through an object in JavaScript https://zellwk.com/blog/looping-through-js-objects/
        // could and should (?) use Object.map() method instead.

        for (const date in firebaseData) {
          if (firebaseData.hasOwnProperty(date)) {
            calendarData[date] = Object.values(firebaseData[date]);
          }
        }
        console.log(calendarData);
        this.setState({ items: calendarData, refreshing: false });
      });
      console.log(this.state);
  }

  exportEvent(item) {
    console.log(item);
    const y = item.date.substring(0, item.date.indexOf('-'));
    const m = item.date.substring(item.date.indexOf('-') + 1, item.date.lastIndexOf('-'));
    const d = item.date.substring(item.date.lastIndexOf('-') + 1);
    const date = new Date(y, m - 1, d);
    const end = new Date(y, m - 1, d);
    console.log(date);
    end.setHours(end.getHours() + 1);
    RNCalendarEvents.authorizeEventStore();
    console.log(RNCalendarEvents.authorizationStatus());
    console.log(end);
    //for some reason the line below returns a promise with an array with 0 items
    console.log(RNCalendarEvents.findCalendars());
    RNCalendarEvents.saveEvent('title', {
      location: 'location',
      notes: 'notes',
      startDate: '2016-10-01T09:45:00.000UTC',
      endDate: '2016-10-01T10:45:00.000UTC'
    });
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyData() {
    return (
      <View style={styles.emptyDate}><Text>No Events Today :/</Text></View>
    );
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: 90 }]}>
        <Text style={styles.itemTitleStyle}>{item.title}</Text>
        <Text>{item.location}</Text>
        <Text>{item.info}</Text>
        <TouchableOpacity onPress={() => this.exportEvent(item)}>
          <Text>Export To Calendar</Text>
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    return (
      <Agenda
        items={this.state.items}
        onRefresh={this.getCalendar.bind(this)}
        refreshing={this.state.refreshing}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyData.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={() => { console.log(this.state); }}
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
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    alignItems: 'center'
  },
  itemTitleStyle: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignSelf: 'center'
  }
};

export default CalendarItems;
