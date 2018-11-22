/*
* 11/22/2018
* Author: Matt Peters
*/

import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../common';
import { getUpcomingGames } from '../../actions';

class UpcomingGamesPage extends Component {
  componentWillMount() {
    this.props.getUpcomingGames();
    console.log(this.props.upcomingGames);
  }

  renderItem(item) {
    console.log(item);
    return (
      null
    );
  }

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <View style={styles.headerViewStyle}>
              <Text style={styles.headerTextStyle}>Sport</Text>
            </View>
            <View style={styles.headerViewStyle}>
              <Text style={styles.headerTextStyle}>VS</Text>
            </View>
            <View style={styles.headerViewStyle}>
              <Text style={styles.headerTextStyle}>When</Text>
            </View>
          </CardSection>
          <FlatList
            style={{ flex: 1 }}
            data={this.props.upcomingGames}
            renderItem={item => this.renderItem(item)}
          />
        </Card>
      </View>
    );
  }
}

const styles = {
  headerViewStyle: {
    flex: 1
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => {
  const { upcomingGames } = state.athleticsInfo;
  return { upcomingGames };
};

export default connect(mapStateToProps, { getUpcomingGames })(UpcomingGamesPage);
