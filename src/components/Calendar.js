import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Titan from '../images/titanT.png';
import { Card, CardSection, Spinner } from './common';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class calendarsPage extends Component {
  state = { showEvent: false, date: [] };

  renderDayEvents() {
    if (this.state.showEvent) {
      return (
        <Card>
          <CardSection>
            <Text style={styles.dateStyle}>{this.state.date}</Text>
          </CardSection>
          <CardSection>
            <ScrollView horizontal>
              <CardSection>
                <Text>Event Here</Text>
              </CardSection>
            </ScrollView>
          </CardSection>
        </Card>
      );
    }
  }

  render() {
    return (
      <View>
        <Calendar
          onDayPress={({ day, month, year }) =>
            this.setState({ showEvent: true, date: [`${month}/`, `${day}/`, year] })}
          theme={styles.calendarStyles}
        />
        {this.renderDayEvents()}
      </View>
    );
  }
}

const styles = {
  calendarStyles: {
    textSectionTitleColor: 'black',
    todaytextColor: 'red',
    dayTextColor: 'black',
    monthTextColor: 'black',
    textMonthFontWeight: 'bold',
    textDisabledColor: 'gray'
  },
  dateStyle: {
    fontSize: 18,
    fontWeight: '400',
    alignItems: 'center'
  }
};

const CalendarStack = createStackNavigator({
  calendarsPage
}, {
  headerLayoutPreset: 'center',
  navigationOptions: ({ navigation }) => ({
    headerTitle:
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          source={Titan}
          style={{ height: 40, width: 40 }}
        />
      </TouchableOpacity>,
  })
});

export default CalendarStack;
