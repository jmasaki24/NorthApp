/**
* Author: Matt Peters
* Date: 12/4/2018
*/

import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, View, } from 'react-native';
import { connect } from 'react-redux';
import { removeScores } from '../../actions';
import { Card, CardSection, ScoreCard, Spinner } from '../common';

class ScorePg extends Component {
  componentWillUnmount() {
    this.props.removeScores();
  }

  record() {
    let wins = 0;
    let loses = 0;
    let ties = 0;
    const scoreArray = this.props.scores;
    for (let i = 0; i < scoreArray.length; i++) {
      const ourScore = scoreArray[i].score.split(' ')[0];
      const theirScore = scoreArray[i].score.split(' ')[2];

      console.log(`ourScore:${ourScore}theirScore:${theirScore}win?:${ourScore > theirScore}`);

      //Problem is that they are being compared as Strings in the conditionals

      if (parseInt(ourScore, 10) > parseInt(theirScore, 10)) {
        wins += 1;
      } else if (parseInt(ourScore, 10) < parseInt(theirScore, 10)) {
        loses += 1;
      } else if (parseInt(ourScore, 10) === parseInt(theirScore, 10)) {
        ties += 1;
      }
    }

    let record = `${wins} - ${loses} - ${ties}`;
    if (ties === 0) {
      record = `${wins} - ${loses}`;
    }
    return record;
  }

  renderItem({ item }) {
    const ourScore = item.score.split(' ')[0];
    const theirScore = item.score.split(' ')[2];
    let WLT = 'T';

    if (parseInt(ourScore, 10) > parseInt(theirScore, 10)) {
      WLT = 'W';
    } else if (parseInt(ourScore, 10) < parseInt(theirScore, 10)) {
      WLT = 'L';
    }

    return (
      <ScoreCard
        otherTeam={item.otherTeam}
        ourScore={ourScore}
        theirScore={theirScore}
        WLT={WLT}
      />
    );
  }

  renderStuff() {
    if (this.props.scores.length !== 0) {
      return (
        <FlatList
          style={{ flex: 1 }}
          data={this.props.scores}
          renderItem={item => this.renderItem(item)}
        />
      );
    } else if (this.props.loading) {
      return (
        <Spinner />
      );
    }
    return (
      <Text style={{ textAlign: 'center', color: 'black' }}>Sorry, could not find scores.</Text>
    );
  }

  render() {
    const sportName = this.props.navigation.state.params.sport;
    console.log(this.props.scores);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Card>
          <CardSection>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', fontSize: 28, color: 'black' }}>
                {sportName}
              </Text>
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
  const { scores, loading } = state.athleticsInfo;
  return { scores, loading };
};

const ScorePage = connect(mapStateToProps, { removeScores })(ScorePg);

export { ScorePage };
