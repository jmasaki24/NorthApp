import React, { Component } from 'react';
import { View, } from 'react-native';
import { CardSection, Button } from './common';

class MenuPage extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Button> Home </Button>
        </CardSection>
        <CardSection>
          <Button> Athletics </Button>
        </CardSection>
        <CardSection>
          <Button> X2 Aspen </Button>
        </CardSection>
        <CardSection>
          <Button> Store </Button>
        </CardSection>
        <CardSection>
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

export default MenuPage;
