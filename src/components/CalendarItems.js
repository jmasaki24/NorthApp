import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Agenda } from 'react-native-calendars';

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
        // looping through an object in JavaScript
        // https://zellwk.com/blog/looping-through-js-objects/
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

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  renderItem(item) {
    console.log('item:');
    console.log(item);
    return (
      <View style={[styles.item, { height: 90 }]}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
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
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={() => { console.log(this.state); }}
        // markingType={'period'}
        // markedDates={{
        //    '2018-11-08': { textColor: '#666' },
        //    '2018-11-09': { textColor: '#666' },
        //    '2018-11-14': { startingDay: true, endingDay: true, color: 'blue' },
        //    '2018-11-21': { startingDay: true, color: 'blue' },
        //    '2018-11-22': { endingDay: true, color: 'gray' },
        //    '2018-11-24': { startingDay: true, color: 'gray' },
        //    '2018-11-25': { color: 'gray' },
        //    '2018-11-26': { endingDay: true, color: 'gray' }
        //  }}
        //  theme={{ agendaKnobColor: 'green' }}
        // renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
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
    paddingTop: 30
  },
};

// export default connect(mapStateToProps, { getCalendar })(CalendarItems);

export default CalendarItems;
