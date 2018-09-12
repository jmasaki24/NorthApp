import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Button, Card } from './common';

class MenuPage extends Component {
  render() {
    const { buttonStyle, textStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Home
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Athletics
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Academics
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Store
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Contact Us
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
  textStyle: {
    color: '#000'
  }
};

export default MenuPage;
