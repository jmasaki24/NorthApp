/**
* Author: Matthew Peters
* Date: 11/28/2018
*/

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from '../common';

class SportsPage extends Component {
  componentWillMount() {
    //webscrape here with props as params
  }

  render() {
    console.log(this.props.navigation.state.params);
    const characteristics = this.props.navigation.state.params;
    const sport = `${characteristics.item.title} ${characteristics.sportName}`;
    return (
      <Card>
        <CardSection>
          <Text
            style={{ fontSize: 20, color: 'black', textAlign: 'center' }}
          >
            {sport}
          </Text>
        </CardSection>
      </Card>
    );
  }
}

export default SportsPage;
