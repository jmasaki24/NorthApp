import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import { Card, CardSection, Input, Button, Spinner } from '../common';
import { pollAuth, pollLoad, idChange, authSwitch } from '../../actions';

class PLogin extends Component {
  state = { ID: '', IDmatches: null, alreadyVoted: null, loading: false };

  onIDChange(text) {
    this.props.idChange(text);
  }

  init() {
    //in order to execute firebase database rules must be changes to => ".write": true
    firebase.database().ref('/Voting/seniors/president').push({ temp: 0 });
    firebase.database().ref('/Voting/seniors/vicePresident').push({ temp: 0 });
    firebase.database().ref('/Voting/seniors/treasurer').push({ temp: 0 });
    firebase.database().ref('/Voting/seniors/senate').push({ temp: 0 });

    firebase.database().ref('/Voting/sophmores/president').push({ temp: 0 });
    firebase.database().ref('/Voting/sophmores/vicePresident').push({ temp: 0 });
    firebase.database().ref('/Voting/sophmores/treasurer').push({ temp: 0 });
    firebase.database().ref('/Voting/sophmores/senate').push({ temp: 0 });

    firebase.database().ref('/Voting/juniors/president').push({ temp: 0 });
    firebase.database().ref('/Voting/juniors/vicePresident').push({ temp: 0 });
    firebase.database().ref('/Voting/juniors/treasurer').push({ temp: 0 });
    firebase.database().ref('/Voting/juniors/senate').push({ temp: 0 });

    firebase.database().ref('/Voting/freshmen/president').push({ temp: 0 });
    firebase.database().ref('/Voting/freshmen/vicePresident').push({ temp: 0 });
    firebase.database().ref('/Voting/freshmen/treasurer').push({ temp: 0 });
    firebase.database().ref('/Voting/freshmen/senate').push({ temp: 0 });
  }

  errorMes() {
    const { errorText } = styles;
    if (this.props.identifyer !== null) {
      if (this.props.identifyer.hasVoted) {
        return (
          <View>
            <Text style={errorText}>
              You cannot vote again
            </Text>
          </View>
        );
      } else if (this.props.auth === false) {
        return (
          <View>
            <Text style={errorText}>
              Sorry, couldn't login for reasons
            </Text>
          </View>
        );
      }
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
            onPress={() => {
              this.props.pollLoad(true);
              this.props.pollAuth(this.props.ID);
            }}
          >
            Login
          </Button>
        </CardSection>
        {this.errorMes()}
      </View>
    );
  }

  render() {
    if (this.props.auth) {
      const grade = this.props.identifyer.grade;
      this.props.navigation.navigate('PollPage', { grade });
      this.props.authSwitch(null);
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
            onChangeText={this.onIDChange.bind(this)}
            value={this.props.ID}
          />
          {this.renderButton()}
        </Card>
      </SafeAreaView>
    );
  }
}

// <CardSection>
//   <Button
//     buttonStyle={styles.buttonStyle}
//     textStyle={{ color: 'black' }}
//     onPress={() => this.init()}
//   >
//     Push Basic to FB
//   </Button>
// </CardSection>

const styles = {
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
  }
};

const mapStateToProps = (state) => {
  const { auth, identifyer, loading, ID } = state.polls;
  return { auth, identifyer, loading, ID };
};

const PollLogin = withNavigation(connect(mapStateToProps, {
  pollAuth,
  pollLoad,
  idChange,
  authSwitch
})(PLogin));

export { PollLogin };
