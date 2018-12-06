import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Button } from '../common';

class ScheduleDropDown extends Component {
  state = { expanded: false };

  renderContent(date, time, place) {
    return null;
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
