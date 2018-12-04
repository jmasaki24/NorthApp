/**
* Author: Matthew Peters
* Date: 11/28/2018
*/

import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Button } from '../common';
import { getSportScores } from '../../actions';

class SportsPage extends Component {
  render() {
    const characteristics = this.props.navigation.state.params;
    const sport = `${characteristics.item.title} ${characteristics.sportName}`;
    return (
      <Card>
        <CardSection>
          <Text
            style={{ fontSize: 20, color: 'black', textAlign: 'center' }}
          >
            {sport}
          </Text>
        </CardSection>
        <CardSection>
          <Button
            onPress={() => {
              this.props.getSportScores(this.props.navigation.state.params.item.link);
              this.props.navigation.navigate('ScorePage');
            }}
          >
            Scores
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { sportInfo } = state.athleticsInfo;
  return { sportInfo };
};

export default withNavigation(connect(mapStateToProps, { getSportScores })(SportsPage));
