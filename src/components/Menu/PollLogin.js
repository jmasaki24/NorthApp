// handles the login page and the home page for polls/student Voting
// author jamie maddock, feb 1st 2019
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Button, Card, CardSection, Input, Spinner, } from '../common';
import { pollAuth, isLoading, idChange, pullPoll } from '../../actions';

class PLogin extends Component {
  state = { ID: '', IDmatches: null, alreadyVoted: null, loading: false };

// should probably call this.props.pullPoll in PollActions.js or something bc this is sketchy...
// without the !(this.props.polls) it leads to infinite re-renders (i think)
  componentDidUpdate() {
    if (this.props.auth && !(this.props.polls)) {
      this.props.isLoading(true);
      this.props.pullPoll(Object.values(this.props.voter)[0]);
    }
  }

  onIDChange(text) {
    this.props.idChange(text);
  }

  onButtonPress(id) {
    this.props.isLoading(true);
    this.props.pollAuth(id);
  }

  onPollSelect(poll) {
    this.props.navigation.navigate('PollPage', { poll });
  }

  errorMes() {
    const { errorText } = styles;
    if (this.props.voter && this.props.auth !== true) {
        return (
          <View>
            <Text style={errorText}>
              Sorry, couldn't login for reasons
            </Text>
          </View>
        );
      }
    }

  renderButton() {
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner />
        </CardSection>
      );
    }
    return (
      <View>
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => this.onButtonPress(this.props.id)}
          >
            Login
          </Button>
        </CardSection>
        {this.errorMes()}
      </View>
    );
  }

  renderPoll(polls) {
    return Object.keys(polls).map(key => (
      <TouchableOpacity key={key} onPress={() => this.onPollSelect(polls[key])} style={styles.titleCardStyle}>
        <Text adjustsFontSizeToFit style={styles.pollTitle}>{polls[key].title}</Text>
      </TouchableOpacity>
    ));
  }

  renderStuff() {
    if (this.props.polls) {
      const openPolls = {};
      Object.keys(this.props.polls).forEach(key => {
        if (this.props.polls[key].isOpen) {
          // console.log(key);
          openPolls[key] = this.props.polls[key];
          openPolls[key].key = key;
        }
      });
      return this.renderPoll(openPolls);
    } else if (this.props.loading) {
      return <Spinner />;
    }
  }

  render() {
    if (this.props.auth) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>Select a Survey</Text>
          <ScrollView style={{ flex: 1 }}>
            {this.renderStuff()}
          </ScrollView>
        </View>
      );
    }
    const { headerStyle } = styles;
    return (
      <SafeAreaView>
        <Card>
          <CardSection style={{ justifyContent: 'center' }}>
            <Text style={headerStyle}>Student Voting</Text>
          </CardSection>
        </Card>
        <Card>
          <Input
            label='Student ID'
            placeholder='12345789'
            keyboardType='number-pad'
            multiline
            onChangeText={this.onIDChange.bind(this)}
            value={this.props.id}
          />
          {this.renderButton()}
        </Card>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  buttonStyle: {
    justifyContent: 'center',
    borderColor: 'white'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center'
  },
  pollTitle: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    margin: 5,
  },
  titleCardStyle: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FFF',

    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  titleText: { // we should probably put this in the header... "Student Voting"
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  const { auth, voter, loading, id, polls } = state.polls;
  return { auth, voter, loading, id, polls };
};

const PollLogin = withNavigation(connect(mapStateToProps, {
  pollAuth,
  isLoading,
  idChange,
  pullPoll,
})(PLogin));

export { PollLogin };
