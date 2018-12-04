/**
* Author: Matt Peters
* Date: 12/4/2018
*/

import React, { Component } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getSportScores } from '../../actions';
import { Card, CardSection, ScoreCard } from '../common';

class ScorePage extends Component {
  record() {
    let wins = 0;
    let loses = 0;
    let ties = 0;
    const scores = this.props.sportInfo.scores;
    console.log(scores);
    console.log(scores !== null);
    if (scores !== null) {
      for (let i = 0; i < scores.length; i++) {
        const WLT = scores[i].score.split(' ')[3];

        if (WLT === 'W') {
          wins += 1;
        } else if (WLT === 'L') {
          loses += 1;
        } else if (WLT === 'T') {
          ties += 1;
        }
      }
    }

    let record = `${wins} - ${loses} - ${ties}`;
    if (ties === 0) {
      record = `${wins} - ${loses}`;
    }
    return record;
  }

  renderItem({ item }) {
    console.log(item);
    const ourScore = item.score.split(' ')[0];
    const theirScore = item.score.split(' ')[2];

    return (
      <ScoreCard
        otherTeam={item.otherTeam}
        ourScore={ourScore}
        theirScore={theirScore}
      />
    );
  }

  renderStuff() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.props.sportInfo.scores}
        renderItem={item => this.renderItem(item)}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Card>
          <CardSection>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', fontSize: 28, color: 'black' }}>
                {this.record()}
              </Text>
            </View>
          </CardSection>
        </Card>
        {this.renderStuff()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { sportInfo } = state.athleticsInfo;
  return { sportInfo };
};

export default connect(mapStateToProps, { getSportScores })(ScorePage);
