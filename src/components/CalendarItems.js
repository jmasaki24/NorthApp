import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Agenda } from 'react-native-calendars';
import { getCalendar } from '../actions';

class CalendarItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }
  // item object would be e.g. {2017-05-01: [ 0: {title: '' etc...}, 1: {title: '' etc...}], 2017-05-02: [0:{etc..}]}
/**
*setTimeout(() => {
*  for (let i = -15; i < 85; i++) {
*    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
*    const strTime = this.timeToString(time);
*    if (!this.state.items[strTime]) {
*      this.state.items[strTime] = [];
*      const numItems = Math.floor(Math.random() * 5);
*      for (let j = 0; j < numItems; j++) {
*        this.state.items[strTime].push({
*          name: `Item for ${strTime}`,
*          height: Math.max(50, Math.floor(Math.random() * 150))
*        });
*      }
*    }
*  }
*  console.log(this.state.items);
*  const newItems = {};
*  Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
*  this.setState({
*    items: newItems
*  });
*}, 1000);
*console.log(`Load Items for ${day.year}-${day.month}`);
*/
  componentWillMount() {
    this.props.getCalendar();
    console.log('hello');
    console.log(this.props.data);
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
    console.log(this.props.data);
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }


  render() {
    return (
      <Agenda
        items={{
        '2018-11-06': { name: 'Item for date', height: 80 },
        '2018-11-07': [{ name: 'Item for date', height: 99 }, { name: 'Item for date', height: 120 }],
        '2018-11-06': { name: 'Item for date', height: 40 }
        }}
        // loadItemsForMonth={this.loadItems.bind(this)}
        minDate={'2018-08-28'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
         // monthFormat={'yyyy'}
         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
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

const mapStateToProps = (state) => {
  const data = state.event;
  return { data };
};

export default connect(mapStateToProps, { getCalendar })(CalendarItems);
