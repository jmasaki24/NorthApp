import React, { Component } from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CardSection, Button } from '../common';

class ScheduleDropDown extends Component {
  state = { expanded: false };

  renderContent(date, time, place) {
    const dayString = `Day: ${date}`;
    const timeString = `Time: ${time}`;
    const placeString = `Place: ${place}`;
    const { dataStyle } = styles;
    if (this.state.expanded) {
      return (
        <View>
          <CardSection style={{ borderBottomWidth: 0 }}>
            <Text style={dataStyle}>{dayString}</Text>
          </CardSection>
          <CardSection style={{ borderBottomWidth: 0 }}>
            <Text style={dataStyle}>{timeString}</Text>
          </CardSection>
          <CardSection>
            <Text style={dataStyle}>{placeString}</Text>
          </CardSection>
        </View>
      );
    }
  }

  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    const { buttonText, date, time, place } = this.props;
    let icon = 'angle-right';
    let CardSectionStyle = {};
    if (this.state.expanded) {
      icon = 'angle-down';
      CardSectionStyle = { borderBottomWidth: 0 };
    }

    return (
      <View>
        <CardSection style={CardSectionStyle}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expanded: !this.state.expanded })}
            icon={<FontAwesome5 name={icon} size={25} color={'black'} />}
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
  },
  dataStyle: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 20
  }
};

export default ScheduleDropDown;
