import React, { Component } from 'react';
import { View, } from 'react-native';
import { CardSection, Button } from './common';

class MenuPage extends Component {
  render() {
    const { buttonStyle, textStyle } = styles;
    return (
      <View>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}> Home </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}> Athletics </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}> X2 Aspen </Button>
        </CardSection>
        <CardSection buttonStyle={buttonStyle} textStyle={textStyle}>
          <Button> Store </Button>
        </CardSection>
        <CardSection buttonStyle={buttonStyle} textStyle={textStyle}>
          <Button> Contact Us </Button>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: '#000'
  },
  textStyle: {
    color: '#000'
  }
};

export default MenuPage;
