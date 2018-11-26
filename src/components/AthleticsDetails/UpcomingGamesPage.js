/*
* 11/22/2018
* Author: Matt Peters
*/

import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../common';
import { getUpcomingGames } from '../../actions';

class UpcomingGamesPage extends Component {
  componentWillMount() {
    this.props.getUpcomingGames();
    console.log(this.props.upcomingGames);
  }

  renderItem({ item }) {
    console.log(item);
    let sport = 'N/A';
    let otherTeam = 'N/A';
    let time = 'N/A';
    const len = item.length;

    for (let i = 0; i < len; i++) {
      if (item[i][0] === 'schedule-game__sport') {
        sport = item[i][1];
      } else if (item[i][0] === 'schedule-game__opponent') {
        otherTeam = item[i][1];
      } else if (item[i][0] === 'schedule-game__time') {
        time = item[i][1];
      }
    }

    return (
      <CardSection style={styles.bodyCardSectionStyle}>
        <View style={styles.leftViewStyle}>
          <Text style={styles.bodyTextStyle}>{sport}</Text>
        </View>
        <View style={styles.middleViewStyle}>
          <Text style={styles.bodyTextStyle}>{otherTeam}</Text>
        </View>
        <View style={styles.rightViewStyle}>
          <Text style={styles.bodyTextStyle}>{time}</Text>
        </View>
      </CardSection>
    );
  }

  render() {
    console.log(this.props.upcomingGames);
    return (
      <View style={{ flex: 1 }}>
        <CardSection>
          <View style={styles.leftViewStyle}>
            <Text style={styles.headerTextStyle}>Sport</Text>
          </View>
          <View style={styles.middleViewStyle}>
            <Text style={styles.headerTextStyle}>VS</Text>
          </View>
          <View style={styles.rightViewStyle}>
            <Text style={styles.headerTextStyle}>When</Text>
          </View>
        </CardSection>
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
  leftViewStyle: {
    flex: 1,
    borderRightWidth: 0.5
  },
  rightViewStyle: {
    flex: 1,
    borderLeftWidth: 0.5
  },
  middleViewStyle: {
    flex: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  },
  headerTextStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  bodyTextStyle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  },
  bodyCardSectionStyle: {
    borderBottomWidth: 0
  }
};

const mapStateToProps = (state) => {
  const { upcomingGames } = state.athleticsInfo;
  return { upcomingGames };
};

export default connect(mapStateToProps, { getUpcomingGames })(UpcomingGamesPage);
