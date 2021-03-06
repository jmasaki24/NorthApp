/**
* Author: Matthew Peters
* Date: 11/28/2018
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Button, Card, CardSection, } from '../common';
import { getSportScores, getSportSchedules, load } from '../../actions';

class SportsPage extends Component {
  render() {
    const characteristics = this.props.navigation.state.params;
    const sport = `${characteristics.item.title} ${characteristics.sportName}`;
    return (
      <Card style={{ flex: 1 }}>
        <CardSection>
          <Text
            style={{ fontSize: 20, color: 'black', textAlign: 'center' }}
          >
            {sport}
          </Text>
        </CardSection>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <CardSection style={styles.scoreButton}>
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
          <CardSection style={{ flex: 1 }}>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={{ color: 'black' }}
              onPress={() => {
                this.props.load(true);
                this.props.getSportSchedules(this.props.navigation.state.params.item.link);
                this.props.navigation.navigate('SchedulePage', { sport });
              }}
            >
              Schedule
            </Button>
          </CardSection>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center',
  },
  scoreButton: {
    flex: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0.5,
    borderColor: '#333',
  }
});

const IndivSportsPage =
  withNavigation(connect(null, { getSportScores, getSportSchedules, load })(SportsPage));

export { IndivSportsPage };
