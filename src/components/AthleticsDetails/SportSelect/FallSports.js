import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { CardSection, Button } from '../../common';

const sports = [
  {
    title: 'Cross Country',
    value: 'CrossCounrty'
  }, {
    title: 'Fall Spirit',
    value: 'FallSpirit'
  }, {
    title: 'Field Hockey',
    value: 'FieldHockey'
  }, {
    title: 'Football',
    value: 'Football'
  }, {
    title: 'Golf',
    value: 'Golf'
  }, {
    title: 'Soccer',
    value: 'Soccer'
  }, {
    title: 'Unified Soccer',
    value: 'UnifiedSoccer'
  }, {
    title: 'Volleyball',
    value: 'Volleyball'
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
    fontSize: 16,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    paddingLeft: 20
  }
};

const FallSportSelect = () => sports.map(sport => <Select key={sport.title} sport={sport} />);

export default FallSportSelect;
