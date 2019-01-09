import React, { Component } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner, Button } from '../common';
import { pullPoll } from '../../actions';

class VotingPage extends Component {
  componentWillMount() {
    console.log(this.props.navigation.state.params.grade);
    this.props.pullPoll(this.props.navigation.state.params.grade);
  }

  renderPoll() {
    const { buttonStyle, buttonTextStyle } = styles;
    let pollArray = Object.keys(this.props.poll);
    pollArray = pollArray.filter(word => word !== 'pollOpen');
    for (let i = 0; i < pollArray.length; i++) {
      if (pollArray[i] === 'VicePresident') { pollArray[i] = 'Vice President'; }
    }

    const buttons = pollArray.map(item =>
      <Card>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            //onPress will navigate to Vote.js and pass specific
            //props of which election will be voted on
          >
            {item}
          </Button>
        </CardSection>
      </Card>
    );

    return buttons;
  }

  renderStuff() {
    if (this.props.poll !== null) {
      if (this.props.poll.pollOpen) {
        return this.renderPoll();
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
    console.log(this.props);
    console.log(this.props.poll);
    return (
      <SafeAreaView>
        <Card>
          <CardSection>
            <Text>
              hello voter
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
    color: 'black',
    fontSize: 18
  }
};

const mapStateToProps = (state) => {
  const { loading, poll } = state.polls;
  return { loading, poll };
};

const PollPage = connect(mapStateToProps, { pullPoll })(VotingPage);

export { PollPage };
