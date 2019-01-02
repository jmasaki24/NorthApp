import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from '../common';

class PollPage extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Text>
            hello voter
          </Text>
        </CardSection>
      </Card>
    );
  }
}

export default PollPage;
