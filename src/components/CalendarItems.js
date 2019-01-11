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
        this.setState({ items: calendarData, refreshing: false });
      });
  }

  // PROP: notes for iOS, description for android
  exportEvent(item) {
    const y = item.date.substring(0, item.date.indexOf('-'));
    const m = item.date.substring(item.date.indexOf('-') + 1, item.date.lastIndexOf('-'));
    const d = item.date.substring(item.date.lastIndexOf('-') + 1);
    const start = new Date(y, m - 1, d);
    // don't do const end = start; bc then they're pointing to the same object
    const end = new Date(y, m - 1, d);
    console.log(start);
    console.log(end);

    if (item.time === 'All Day') {
      end.setHours(start.getHours() + 1);
      RNCalendarEvents.authorizeEventStore().then((k) => {
        console.log(k);
        RNCalendarEvents.saveEvent(item.title, {
          allDay: true,
          location: item.location,
          notes: item.info,
          description: item.info,
          startDate: start,
          endDate: end
        });
      }).catch(err => console.log(err));
    } else {
      if (item.time.substring(item.time.indexOf(' ') + 1) === 'PM') {
        // parseInt(string, radix) the radix param causes a return of NaN
        start.setHours(parseInt(item.time.substring(0, item.time.indexOf(':'))) + 12);
      } else {
         start.setHours(item.time.substring(0, item.time.indexOf(':')));
       }
      start.setMinutes(item.time.substring(item.time.indexOf(':') + 1, item.time.indexOf(' ')));
      end.setHours(start.getHours() + 1);
      end.setMinutes(start.getMinutes());
      RNCalendarEvents.authorizeEventStore().then(() => {
        console.log(item);
        console.log(start);
        console.log(end);
        RNCalendarEvents.saveEvent(item.title, {
          location: item.location,
          notes: item.info,
          description: item.info,
          startDate: start,
          endDate: end
        });
      });
    }
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
      <View style={[styles.item]}>
        <Text style={styles.itemTitleStyle}>{item.title}</Text>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={{ marginRight: 10 }}>{item.time}</Text><Text>{item.location}</Text>
        </View>
        <Text>{item.info}</Text>
        <TouchableOpacity
          style={{ alignSelf: 'center' }} onPress={() => this.exportEvent(item)}
        >
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
        // onDayPress={() => { console.log(this.state); }}
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
