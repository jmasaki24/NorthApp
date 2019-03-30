import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import firebase from 'firebase';
import { Agenda } from 'react-native-calendars';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class CalendarItems extends PureComponent {
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

        // could and should (?) use Object.map() or .forEach() instead
        for (const date in firebaseData) {
          const has = firebaseData.hasOwnProperty;
          if (has) {
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
    const start = new Date(y, m - 1, d); // month is 0-11 for Date object
    // don't do const end = start; bc then they're pointing to the same object
    const end = new Date(y, m - 1, d);

    const eventConfig = {
      allDay: false,
      title: item.title,
      startDate: start,
      endDate: end,
      location: item.location,
      // notes: item.info,
      description: item.info,
    };

    if (item.time === 'All Day') {
      end.setHours(start.getHours() + 1);
      eventConfig.allDay = true;

      AddCalendarEvent.presentEventCreatingDialog(eventConfig)
        .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
        console.warn(JSON.stringify(eventInfo));
        })
        .catch((error: string) => {
          // handle error such as when user rejected permissions
          console.warn(error);
        });
    } else {
      if (item.time.substring(item.time.indexOf(' ') + 1) === 'PM' && item.time.substring(0, item.time.indexOf(':')) !== '12') {
        start.setHours(parseInt(item.time.substring(0, item.time.indexOf(':')), 10) + 12);
      } else {
         start.setHours(item.time.substring(0, item.time.indexOf(':')));
       }
      start.setMinutes(item.time.substring(item.time.indexOf(':') + 1, item.time.indexOf(' ')));
      end.setHours(start.getHours() + 1);
      end.setMinutes(start.getMinutes());
      console.log(eventConfig);
      AddCalendarEvent.presentEventCreatingDialog(eventConfig)
        .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
        console.warn(JSON.stringify(eventInfo));
        })
        .catch((error: string) => {
          // handle error such as when user rejected permissions
          console.warn(error);
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
      <View style={styles.emptyDate}>
        <Text>No Events Today :/</Text>
      </View>
    );
  }

  renderItem(item) {
    return (
      <View key={item.id} style={[styles.item]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.itemTitleStyle}>{item.title}</Text>
          <Icon.Button
            name={'calendar-export'} size={20} style={{ flex: -1 }}
            iconStyle={{ marginRight: 0, color: '#999', flex: -1 }} backgroundColor='#fff'
            onPress={() => this.exportEvent(item)}
          />
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={{ marginRight: 10 }}>{item.time}</Text><Text>{item.location}</Text>
        </View>
        <Text>{item.info}</Text>
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
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  itemTitleStyle: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    flex: 2,
  }
});

export default CalendarItems;
