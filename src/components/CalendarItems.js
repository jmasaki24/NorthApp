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
        // looping through an object in JavaScript https://zellwk.com/blog/looping-through-js-objects/
        // could use Object.map() method instead.

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

  renderEmptyData() {
    return (
      <View style={styles.emptyDate}><Text>No Events Today :/</Text></View>
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
};

// export default connect(mapStateToProps, { getCalendar })(CalendarItems);

export default CalendarItems;
