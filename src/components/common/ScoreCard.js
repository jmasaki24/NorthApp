/**
* Author: Matt Peters
* Last Edit: 12/4/2018
*/

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from './Card';
import { CardSection } from './CardSection';

class ScoreCard extends Component {
  renderVS(WLT) {
    const { vsStyle } = styles;
    if (WLT === 'W') {
      return <Text style={[vsStyle, { color: 'green' }]}>VS</Text>;
    } else if (WLT === 'L') {
      return <Text style={[vsStyle, { color: 'red' }]}>VS</Text>;
    }
    return <Text style={vsStyle}>VS</Text>;
  }

  render() {
    const { ourScore, theirScore, otherTeam, WLT } = this.props;
    const { titleStyle, scoreStyle, viewStyle } = styles;
    return (
      <Card>
        <CardSection>
          <View style={viewStyle}>
           <Text style={titleStyle}>Titans</Text>
           <Text style={scoreStyle}>{ourScore}</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            {this.renderVS(WLT)}
          </View>
          <View style={viewStyle}>
            <Text style={titleStyle}>{otherTeam}</Text>
            <Text style={scoreStyle}>{theirScore}</Text>
          </View>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 23,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
    textAlign: 'center'
  },
  viewStyle: {
    alignItems: 'center',
    flex: 3,
    flexDirection: 'column'
  },
  scoreStyle: {
    fontSize: 50,
    color: 'black'
  },
  vsStyle: {
    color: 'black',
    fontSize: 30
  }
};

export { ScoreCard };
