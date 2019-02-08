// uses app-level state (redux) and local state because going through everything is a grind

import React, { Component } from 'react';
import { Modal, Picker, Text, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Button, CardSection, Spinner, } from '../common';
import { pullPoll, isLoading, castVote } from '../../actions';

class VotingPage extends Component {
  state = { showModal: false, poll: {}, questionKeys: [], questions: {} };

  componentWillMount() {
    const poll = this.props.navigation.state.params.poll;
    this.setState({ poll });
    const questions = {};
    const questionKeys = Object.keys(poll).reduce((result, key) => {
      if (/^question*/.test(key)) {
        result.push(key);
        questions[key] = '';
      }
      return result;
    }, []);
    this.setState({ questionKeys, questions });
  }

  onAccept() {
    this.props.castVote(this.state.poll, this.state.questions);
    this.setState({ showModal: false, poll: {}, questionKeys: [], questions: {} });
    this.props.navigation.pop();
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  confirmVoteModal() {
    return this.state.questionKeys.map(q => (
      <View key={q} style={{ flex: 0, alignSelf: 'flex-start' }}>
          <Text style={styles.textStyle}>
            {this.state.poll[q].title}: {this.state.questions[q]}
          </Text>
          </View>
        ));
  }

  renderAnswers(question) {
     // filter() bc object.keys must return something for every key, RN Picker can't render null
     return (
       Object.keys(question).filter(key => key !== 'title').map(key => (
             <Picker.Item key={key} label={key} value={key} />
      )));
   }

  renderQuestions(poll) {
    // first get an array of the keys to the questions
    const questionKeys = Object.keys(poll).reduce((result, key) => {
      if (/^question*/.test(key)) {
        result.push(key);
        // this.setState({ [key]: '' });
      }
      return result;
    }, []);

    return (questionKeys.map(q => (
        <CardSection style={styles.questionContainer} key={q}>
          <Text style={styles.sectionHeadStyle}>{poll[q].title}</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.questions[q]}
            onValueChange={value =>
              this.setState({ questions: Object.assign(this.state.questions, { [q]: value }) })}
          >
            <Picker.Item label='Select or Leave Blank' value='' />
            {this.renderAnswers(poll[q])}
          </Picker>
        </CardSection>
      )));
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <Button
      onPress={() => this.setState({ showModal: true })}
        buttonStyle={{ padding: 10, margin: 10 }}
        textStyle={{ fontSize: 24 }}
      >
        (Vote) does nothing yet
      </Button>
    );
  }

  render() {
    const poll = this.props.navigation.state.params.poll;
    // console.log(this.state);
    const { titleText, containerStyle, buttonStyle } = styles;
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
        <ScrollView style={{ flex: 0 }}>
          <Text style={titleText}>{poll.title}</Text>
          {this.renderQuestions(poll)}
        </ScrollView>
        {this.renderButton()}

        <Modal
          visible={this.state.showModal}
          animationType="slide"
          onRequestClose={() => this.setState({ showModal: false })}
          presentationStyle='overFullScreen'
        >
          <View style={containerStyle}>
            <CardSection style={styles.confirmModalQuestions}>
              <Text style={styles.modalText}>Your Answers Are: </Text>
              {this.confirmVoteModal()}
            </CardSection>

            <CardSection style={styles.confirmModalBottom}>
              <Text style={styles.modalText}>Please confirm your selection</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Button onPress={this.onAccept.bind(this)} buttonStyle={buttonStyle}>Vote</Button>
                <Button onPress={this.onDecline.bind(this)} buttonStyle={buttonStyle}>Cancel</Button>
              </View>
            </CardSection>
          </View>
        </Modal>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  confirmModalQuestions: {
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  confirmModalBottom: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  questionContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    marginTop: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  sectionHeadStyle: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  titleCardStyle: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',

    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  const { loading, polls, } = state.polls;
  // console.log(state.polls);
  return { loading, polls, };
};

const PollPage = withNavigation(connect(mapStateToProps, {
  pullPoll, isLoading, castVote })(VotingPage));

export { PollPage };
