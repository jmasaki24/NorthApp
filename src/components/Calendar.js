/**
* Author: Jamie Maddock
* Date: //You can fill this part in Jamie
*/

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Titan from '../images/titanT.png';
import CalendarItems from './CalendarItems';

const Calendar = () => (
  <CalendarItems />
);

const CalendarStack = createStackNavigator({
  Calendar
}, {
  headerLayoutPreset: 'center',
  navigationOptions: ({ navigation }) => ({
    headerTitle:
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          source={Titan}
          style={{ height: 40, width: 40 }}
        />
      </TouchableOpacity>,
  })
});

export default CalendarStack;
