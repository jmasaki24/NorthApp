/**
* Author: Matt Peters
* Last Edit: 11/25/2018
*/

import React, { Component } from 'react';
import { View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CardSection, Button } from '../common';

class Select extends Component {
  state = { pressed: false };

  renderChildSports(childSport) {
    if (this.state.pressed) {
      console.log(childSport);
      const { buttonStyle, childButtonTextStyle } = styles;
      const items = childSport.map(item =>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={childButtonTextStyle}
          >
            {item}
          </Button>
        </CardSection>
      );
      return items;
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state.pressed);
    const data = this.props.sport;
    let iconType = 'angle-right';
    if (this.state.pressed) { iconType = 'angle-down'; }
    const { buttonStyle, buttonTextStyle } = styles;
    return (
      <View>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ pressed: !this.state.pressed })}
            icon={<FontAwesome5 name={iconType} size={20} color={'black'} />}
          >
            {data.title}
          </Button>
        </CardSection>
        {this.renderChildSports(data.childSport)}
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 20
  },
  childButtonTextStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 40
  }
};

const SportSelect = (props) => props.data.map(sport =>
  <Select key={sport.title} sport={sport} />);

export default SportSelect;
