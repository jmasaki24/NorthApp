import React, { Component } from 'react';
import { Card, Button, CardSection } from './common';

class AcademicsPage extends Component {
  render() {
    const { buttonStyle, textStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            X2 Aspen
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Staff Directory
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Bell Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Student Handbook
          </Button>
        </CardSection>
        <CardSection>
          <Button buttonStyle={buttonStyle} textStyle={textStyle}>
            Compentency Handbook
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

export default AcademicsPage;
