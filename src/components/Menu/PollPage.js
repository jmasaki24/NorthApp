import React, { Component } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Spinner, Button } from '../common';
import { Vote } from './Vote';
import { pullPoll, pollLoad } from '../../actions';

class VotingPage extends Component {
  componentWillMount() {
    this.props.pollLoad(true);
    this.props.pullPoll(this.props.navigation.state.params.grade);
  }

  renderPoll() {
    let pollArray = Object.keys(this.props.poll);
    pollArray = pollArray.filter(word => word !== 'pollOpen');

    return pollSection(pollArray, this.props.poll);
  }

  renderStuff() {
    if (this.props.poll !== null) {
      if (this.props.poll.pollOpen) {
        return (
          <ScrollView>
            {this.renderPoll()}
          </ScrollView>
        );
      }
      return (
        <Text style={{ textAlign: 'center', color: 'black' }}>
          Sorry, no polls yet.
        </Text>
      );
    } else if (this.props.loading) {
      return <Spinner />;
    }
  }

  render() {
    console.log(this.props.poll);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.renderStuff()}
        <Card>
          <CardSection>
            <Button>
              (Vote) does nothing yet
            </Button>
          </CardSection>
        </Card>
      </SafeAreaView>
    );
  }
}

const pollSection = (pollArray, pops) => {
  return pollArray.map((item) =>
    <Card>
      <CardSection style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={styles.sectionHeadStyle}>
          {item}
        </Text>
        <VotePicker item={item} pops={pops} />
      </CardSection>
    </Card>
  );
};

const VotePicker = ({ item, pops }) => {
  const keyArr = Object.keys(pops);
  const canArr = Object.values(pops);
  for (let i = 0; i < keyArr.length; i++) {
    if (keyArr[i] === item) {
      return (
        <Vote candidates={canArr[i]} category={item} />
      );
    }
  }
};

const styles = {
  sectionHeadStyle: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => {
  const { loading, poll } = state.polls;
  return { loading, poll };
};

const PollPage = withNavigation(connect(mapStateToProps, { pullPoll, pollLoad })(VotingPage));

export { PollPage };
