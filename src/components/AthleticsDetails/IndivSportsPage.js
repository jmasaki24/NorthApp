/**
* Author: Matthew Peters
* Date: 11/28/2018
*/

import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Button } from '../common';
import { getSportScores, getSportSchedules, load } from '../../actions';

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
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => {
              this.props.load(true);
              this.props.getSportScores(this.props.navigation.state.params.item.link);
              this.props.navigation.navigate('ScorePage', { sport });
            }}
          >
            Scores
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => {
              //this.props.load(true);
              this.props.getSportSchedules(this.props.navigation.state.params.item.link);
              this.props.navigation.navigate('SchedulePage', { sport });
            }}
          >
            Schedule
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center'
  }
};

export default withNavigation(connect(null, { getSportScores, getSportSchedules, load })(SportsPage));
