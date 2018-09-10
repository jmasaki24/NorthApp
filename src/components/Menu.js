import React from 'react';
import { Button, Card, CardSection } from './common';


const Menu = () => {
    const { buttonStyle, textStyle } = styles;
    return (
      <Card>
        <Button buttonStyle={buttonStyle} textStyle={textStyle}>
          Academics
        </Button>
        <Button buttonStyle={buttonStyle} textStyle={textStyle}>
          Store?
        </Button>
        <Button buttonStyle={buttonStyle} textStyle={textStyle}>
          Clubs
        </Button>
        <Button buttonStyle={buttonStyle} textStyle={textStyle}>
          Sports
        </Button>
        <Button buttonStyle={buttonStyle} textStyle={textStyle}>
          Staff Directory
        </Button>
        <Button buttonStyle={buttonStyle} textStyle={textStyle}>
          Contact us
        </Button>
    </Card>
  );
};

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  textStyle: {
    color: 'black'
  }
};
export default Menu;
