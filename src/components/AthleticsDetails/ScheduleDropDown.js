import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, Button } from '../common';

class ScheduleDropDown extends Component {
  state = { expanded: false };

  renderContent(date, time, place) {
    const dayString = `Day: ${date}`;
    const timeString = `Time: ${time}`;
    const placeString = `Place: ${place}`;
    if (this.state.expanded) {
      return (
        <View>
          <CardSection>
            <Text>{dayString}</Text>
          </CardSection>
          <CardSection>
            <Text>{timeString}</Text>
          </CardSection>
          <CardSection>
            <Text>{placeString}</Text>
          </CardSection>
        </View>
      );
    }
  }

  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    const { buttonText, date, time, place } = this.props;
    return (
      <View>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expanded: !this.state.expanded })}
            //icon={}
          >
            {buttonText}
          </Button>
        </CardSection>
        {this.renderContent(date, time, place)}
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    fontSize: 16,
    color: 'black'
  }
};

export default ScheduleDropDown;
