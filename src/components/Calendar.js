import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Calendar from 'react-native-calendar'
import { Card, CardSection } from './common';


class calendar extends Component {
  state = { showDay: false, day: null }

  onDateSelect(date) {
    this.setState({ showDay: true, day: date });
  }

  renderDay() {
    if (this.state.showDay) {
      return (
        <Card>
          <CardSection style={{ backgroundColor: '#F8F8F8' }}>
            <ScrollView horizontal>
              <CardSection
                style={{ eventStyle }}
              >
                <Text>Stuff Due</Text>
              </CardSection>
            </ScrollView>
          </CardSection>
        </Card>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Calendar
            scrollEnabled
            dayHeadings={
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
            monthNames={
              ['January', 'February', 'March ', 'April ', 'May ', 'June',
               'July', 'August', 'September ', 'October', 'November', 'December']
            }
            showControls
            nextButtonText={'Next>'}
            prevButtonText={'<Prev'}
            weekStart={0}
            customStyle={calendarStyle}
            onDateSelect={(date) => this.onDateSelect(date)}
          />
        </Card>
        {this.renderDay()}
      </View>
    );
  }
}

const calendarStyle = {
  controlButtonText: {
    color: 'blue'
  },
  weekendHeading: {
    color: 'black'
  },
  weekendDayText: {
    color: 'black'
  }
};

const eventStyle = {
  borderWidth: 2,
  flex: 1,
  height: 100,
  width: 100,
  backgroundColor: '#F8F8F8'
};

export default calendar;
