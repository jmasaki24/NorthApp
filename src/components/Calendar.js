import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Calendar, Agenda } from 'react-native-calendars';
import Titan from '../images/titanT.png';
import { Card, CardSection, Spinner } from './common';

class calendarsPage extends Component {
  constructor(props) {
    super(props);
    const d = new Date();

    //showEvent: bool, date: [string,string,string]
    //since getMonth() returns a number from 0-11, must add 1 and convert to string
    this.state = {
      showEvent: true,
      date: [`${d.getMonth() + 1}/`, `${d.getDate()}/`, `${d.getFullYear()}`]
    };
  }
  componentWillMount() {
    console.log(this.state);
    console.log(Date());
    this.renderDayEvents();
  }

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
    flex: 1,
    textSectionTitleColor: 'black',
    todaytextColor: 'red',
    dayTextColor: 'black',
    monthTextColor: 'black',
    textMonthFontWeight: 'bold',
    textDisabledColor: 'gray',
    selectedDayBackground: '#111',


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
