/**
* Author: Matt Peters
* Date: 12/4/2018
*/

import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { removeSchedules } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import ScheduleDropDown from './ScheduleDropDown';

class SchedulePage extends Component {
  componentWillUnmount() {
    this.props.removeSchedules();
  }

  renderItem({ item }) {
    console.log(item);

    let date = 'N/A';
    let time = 'TBA';
    let opponent = 'N/A';
    let place = 'N/A';

    const when = item.dateTime.split(' ');
    date = when[0];
    opponent = item.opponent;

    if (!item.dateTime.includes('TBA')) {
      time = `${when[1]} ${when[2]}`;
    }

    if (item.place !== undefined) {
      place = item.place;
    }

    if (opponent.includes('TBA')) {
      opponent = opponent.replace('vs ', '');
    }

    const buttonText = `${item.homeAway} vs ${opponent}`;
    return (
      <ScheduleDropDown
        buttonText={buttonText}
        date={date}
        time={time}
        place={place}
      />
    );
  }

  renderStuff() {
    const schedule = this.props.sportInfo.schedule;
    console.log(this.props.loading);
    console.log(schedule);
    if (schedule !== []) {
        return (
          <Card style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1, paddingbottom: 20 }}
              data={schedule}
              renderItem={item => this.renderItem(item)}
            />
          </Card>
        );
    } else if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <Text style={{ textAlign: 'center', color: 'black' }}>Sorry, could not find schedule.</Text>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Card>
          <CardSection style={{ justifyContent: 'center' }}>
            <Text
              style={{ color: 'black', fontWeight: 'bold', fontSize: 28, textAlign: 'center' }}
            >
              {this.props.navigation.state.params.sport}
            </Text>
          </CardSection>
        </Card>
        {this.renderStuff()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { sportInfo, loading } = state.athleticsInfo;
  return { sportInfo, loading };
};

export default connect(mapStateToProps, { removeSchedules })(SchedulePage);
