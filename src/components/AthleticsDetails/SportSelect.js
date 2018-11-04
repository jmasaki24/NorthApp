/**
* Author: Matt Peters
*/

import React from 'react';
import { CardSection, Button } from '../common';

const Select = ({ sport }) => {
  const { title } = sport;
  const { buttonStyle, buttonTextStyle } = styles;
  return (
    <CardSection>
      <Button
        buttonStyle={buttonStyle}
        textStyle={buttonTextStyle}
      >
        {title}
      </Button>
    </CardSection>
  );
};

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 20
  }
};

const SportSelect = (props) => props.data.map(sport =>
  <Select key={sport.title} sport={sport} />);

export default SportSelect;
