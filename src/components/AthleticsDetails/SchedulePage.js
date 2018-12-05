/**
* Author: Matt Peters
* Date: 12/4/2018
*/

import React, { Component } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { removeSchedules } from '../../actions';
import { Card, CardSection, Spinner } from '../common';

class SchedulePage extends Component {
  // componentWillUnmount() {
  //   this.props.removeScheules();
  // }

  render() {
    console.log(this.props);
    return (
      <SafeAreaView>
        <Card>
          <CardSection>
            <Text>
              {this.props.navigation.state.params.sport}
            </Text>
          </CardSection>
          <CardSection>
            <Text>
              Working on pulling info for now.
            </Text>
          </CardSection>
        </Card>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { sportInfo, loading } = state.athleticsInfo;
  return { sportInfo, loading };
};

export default connect(mapStateToProps, { removeSchedules })(SchedulePage);
