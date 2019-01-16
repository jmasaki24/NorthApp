/*
* Author: Matt Peters
* Last Edit: 11/28/18
*/

import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import { withNavigation } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button, CardSection, } from '../common';

class Select extends Component {
  state = { pressed: false };

  renderChildSports(childSport, sport, sportName) {
    if (this.state.pressed) {
      const { buttonStyle, childButtonTextStyle } = styles;
      const items = childSport.map(item =>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={childButtonTextStyle}
            onPress={() => this.props.navigation.navigate('IndivSportsPage', { item, sport, sportName })}
          >
            {item.title}
          </Button>
        </CardSection>
      );
      return items;
    }
  }

  render() {
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
        {this.renderChildSports(data.childSport, data.value, data.title)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: 'white',
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  childButtonTextStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 40,
  }
});

export default withNavigation(Select);
