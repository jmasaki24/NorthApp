import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';

class PollPage extends Component {
  render() {
    const { headerStyle, buttonStyle } = styles;
    return (
      <SafeAreaView>
        <Card>
          <CardSection style={{ justifyContent: 'center' }}>
            <Text style={headerStyle}>Student Voting</Text>
          </CardSection>
        </Card>
        <Card>
          <Input
            label='Student ID #'
            placeholder='12345789'
            keyboardType='number-pad'
          />
          <CardSection>
            <Button
              buttonStyle={buttonStyle}
              textStyle={{ color: 'black' }}
            >
              Login
            </Button>
          </CardSection>
        </Card>
      </SafeAreaView>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonStyle: {
    justifyContent: 'center',
    borderColor: 'white'
  }
};

export default PollPage;
