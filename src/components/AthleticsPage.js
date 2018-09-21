import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, CardSection, Button } from './common';

class AthleticsPage extends Component {
  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Upcoming Games
            </Button>
          </CardSection>
        </Card>
        <View style={{ height: 20 }} />
        <Card>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Fall
            </Button>
          </CardSection>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Winter
            </Button>
          </CardSection>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Spring
            </Button>
          </CardSection>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Summer?
            </Button>
          </CardSection>
        </Card>
        <View style={{ height: 20 }} />
        <Card>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Coach Directory
            </Button>
          </CardSection>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Policies
            </Button>
          </CardSection>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Signup/Registration
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
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
