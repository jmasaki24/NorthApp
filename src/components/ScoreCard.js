/**
* Author: Matt Peters
*/

import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection } from './common';

const ScoreCard = ({ otherTeam, ourScore, theirScore }) => {
  const { titleStyle, scoreStyle, viewStyle } = styles;
  return (
    <Card>
      <CardSection>
        <View style={viewStyle}>
         <Text style={titleStyle}>Titans</Text>
         <Text style={scoreStyle}>{ourScore}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: 30 }}> VS </Text>
        </View>
        <View style={viewStyle}>
          <Text style={titleStyle}>{otherTeam}</Text>
          <Text style={scoreStyle}>{theirScore}</Text>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  titleStyle: {
    fontSize: 23,
    fontWeight: 'bold',
    flex: 1
  },
  viewStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  scoreStyle: {
    fontSize: 50
  }
};

export default ScoreCard;
