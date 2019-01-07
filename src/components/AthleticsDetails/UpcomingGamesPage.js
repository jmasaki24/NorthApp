/*
* 11/22/2018
* Author: Matt Peters
*/

import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from '../common';
import { getUpcomingGames, load } from '../../actions';

class UpcomingGamesPage extends Component {
  componentWillMount() {
    this.props.getUpcomingGames();
    this.props.load(true);
    // console.log(this.props.upcomingGames);
  }

  renderItem({ item }) {
    // console.log(item);
    let sport = 'N/A';
    let otherTeam = 'N/A';
    let time = 'N/A';
    let day = 'N/A';
    const len = item.length;
    const { bodyTextStyle, bodyTitleStyle, cardSectionStyle } = styles;

    for (let i = 0; i < len; i++) {
      if (item[i][0] === 'schedule-game__sport') {
        sport = item[i][1];
      } else if (item[i][0] === 'schedule-game__opponent') {
        otherTeam = item[i][1];
        if (otherTeam.includes('(A) vs')) { otherTeam = otherTeam.replace('(A) vs ', ''); }
        if (otherTeam.includes('(H) vs')) { otherTeam = otherTeam.replace('(H) vs ', ''); }
        if (otherTeam.includes('(A)')) { otherTeam = otherTeam.replace('(A) ', ''); }
        if (otherTeam.includes('(H)')) { otherTeam = otherTeam.replace('(H) ', ''); }
      } else if (item[i][0] === 'schedule-game__time') {
        time = item[i][1];
        if (time.includes('@')) {
          const temp = time.split('@');
          time = temp[1];
          if (time.includes('AM')) { time = time.replace('AM', ' AM'); }
          if (time.includes('PM')) { time = time.replace('PM', ' PM'); }
          day = temp[0];
        }
      }
    }

    return (
      <Card>
        <CardSection style={cardSectionStyle}>
          <View>
            <Text style={bodyTitleStyle}>Sport: </Text>
            <Text style={bodyTextStyle}>  {sport}</Text>
          </View>
          <View>
            <Text style={bodyTitleStyle}>Against:</Text>
            <Text style={bodyTextStyle}>  {otherTeam}</Text>
          </View>
          <View>
            <Text style={bodyTitleStyle}>Date: </Text>
            <Text style={bodyTextStyle}>  {day}</Text>
          </View>
          <View>
            <Text style={bodyTitleStyle}>Time: </Text>
            <Text style={bodyTextStyle}>  {time}</Text>
          </View>
        </CardSection>
      </Card>
    );
  }

  render() {
    // console.log(this.props.upcomingGames);
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <CardSection style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>Upcoming Games</Text>
          </CardSection>
        </Card>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.upcomingGames}
          renderItem={item => this.renderItem(item)}
        />
      </View>
    );
  }
}

const styles = {
  bodyTitleStyle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  bodyTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  cardSectionStyle: {
    flexDirection: 'column'
  }
};

const mapStateToProps = (state) => {
  const { upcomingGames, loading } = state.athleticsInfo;
  return { upcomingGames, loading };
};

const UpcomingGames = connect(mapStateToProps, { getUpcomingGames, load })(UpcomingGamesPage);

export { UpcomingGames };
