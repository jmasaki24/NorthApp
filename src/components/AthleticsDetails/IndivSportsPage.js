/**
* Author: Matthew Peters
* Date: 11/28/2018
*/

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from '../common';

class SportsPage extends Component {
  componentWillMount() {
    console.log(this.props);
    //webscrape here with props as params
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Text>Go Team!</Text>
        </CardSection>
      </Card>
    );
  }
}

export default SportsPage;
