import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, CardSection, Button } from './common';

class AthleticsPage extends Component {
  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
          >
            Fall
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
          >
            Winter
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
          >
            Spring
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    color: 'black'
  }
};

export default AthleticsPage;
