/**
* Author: Matt Peters
* Date: 12/4/2018
*/

import React, { Component } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { removeSchedules } from '../../actions';
import { Button, Card, CardSection, Spinner } from '../common';

class SchedulePage extends Component {
  // componentWillUnmount() {
  //   this.props.removeScheules();
  // }

  renderItem({ item }) {
    console.log(item);
    const { buttonStyle, buttonTextStyle } = styles;

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

    //maybe move the native components into a separate const (within this file possibly)
    //so that it can have its own state property to allow for expansion, rendering of data,
    //and what not
    // ^ for 12/6/18 ^
    return (
      <View>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            //onPress={}
            //icon={}
          >
            {date}
          </Button>
        </CardSection>
      </View>
    );
  }

  renderStuff() {
    const schedule = this.props.sportInfo.schedule;
    console.log(schedule);
    if (schedule !== null && (schedule.toString() !== '')) {
      return (
        <Card style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
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
          <CardSection>
            <Text>
              {this.props.navigation.state.params.sport}
            </Text>
          </CardSection>
        </Card>
        {this.renderStuff()}
      </SafeAreaView>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    fontSize: 16,
    color: 'black'
  }
  //add title styles for the sport name at the to of the screen
};

const mapStateToProps = (state) => {
  const { sportInfo, loading } = state.athleticsInfo;
  return { sportInfo, loading };
};

export default connect(mapStateToProps, { removeSchedules })(SchedulePage);
