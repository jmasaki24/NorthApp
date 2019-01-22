/**
* Author: Matt Peters
* Date: 12/4/2018
*/

import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, } from 'react-native';
import { connect } from 'react-redux';
import { removeSchedules } from '../../actions';
import { Card, CardSection, Spinner, } from '../common';
import ScheduleDropDown from './ScheduleDropDown';

class SchedulePg extends Component {
  componentWillUnmount() {
    this.props.removeSchedules();
  }

  renderItem({ item }) {
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

    const buttonText = `${date} ${item.homeAway} vs ${opponent}`;
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
    const scheduleArray = this.props.schedule;
    if (scheduleArray.length !== 0) {
      return (
        <Card style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1, paddingbottom: 20 }}
            data={scheduleArray}
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
  const { schedule, loading } = state.athleticsInfo;
  return { schedule, loading };
};

const SchedulePage = connect(mapStateToProps, { removeSchedules })(SchedulePg);

export { SchedulePage };
