import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { CardSection, Button } from '../../common';

const sports = [
  {
    title: '    Alpine Skiing',
    value: 'AlpineSkiing'
  }, {
    title: '    Basketball',
    value: 'Basketball'
  }, {
    title: '    Gymnastics',
    value: 'Gynmastics'
  }, {
    title: '    Ice Hockey',
    value: 'IceHockey'
  }, {
    title: '    Indoor Track',
    value: 'IndoorTrack'
  }, {
    title: '    Swimming Diving',
    value: 'SwimmingDiving'
  }, {
    title: '    Unified Basketball',
    value: 'UnifiedBasketball'
  }, {
    title: '    Winter Spirit',
    value: 'WinterSpirit'
  }, {
    title: '    Wrestling',
    value: 'Wrestling'
  }
];

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
    fontSize: 14,
    fontWeight: 'normal',
    alignSelf: 'flex-start'
  }
};

const WinterSportSelect = () => sports.map(sport => <Select key={sport.title} sport={sport} />);

export default WinterSportSelect;
