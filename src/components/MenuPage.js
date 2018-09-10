import React, { Component } from 'react';
import { View, } from 'react-native';
import { CardSection, Button } from './common';

class MenuPage extends Component {
  render() {
    const { buttonStyle, textStyle } = styles;
    return (
      <View>
        <CardSection buttonStyle={{ buttonStyle }} textStyle={{ textStyle }}>
          <Button buttonStyle={{ buttonStyle }} textStyle={{ textStyle }}> Home </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={{ buttonStyle }} textStyle={{ textStyle }}> Athletics </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={{ buttonStyle }} textStyle={{ textStyle }}> X2 Aspen </Button>
        </CardSection>
        <CardSection buttonStyle={{ buttonStyle }} textStyle={{ textStyle }}>
          <Button> Store </Button>
        </CardSection>
        <CardSection buttonStyle={{ buttonStyle }} textStyle={{ textStyle }}>
          <Button> Contact Us </Button>
        </CardSection>
      </View>
    );
  }
}
//need to fix button.js to be more...versatile
// or just not use button.js for menupage
/*const styles = {
  ListItem: {
    borderColor: 'black',
    fontColor: 'black',
    fontSize: '14',
  }
}*/

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  textStyle: {
    color: 'black'
  }
};

export default MenuPage;
