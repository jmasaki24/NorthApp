import React, { Component } from 'react';
import { ListView, Text, } from 'react-native';
import { Card, CardSection, Button } from './common';

class MenuPage extends Component {
  render() {
    return(
      <ListView>
        <Card>
          <Button> Home </Button>
        </Card>
        <Card>
          <Button> Athletics </Button>
        </Card>
        <Card>
          <Button> X2 Aspen </Button>
        </Card>
        <Card>
          <Button> Store </Button>
        </Card>
        <Card>
          <Button> Contact Us </Button>
        </Card>
      </ListView>
    );
  }
}

export default MenuPage;
