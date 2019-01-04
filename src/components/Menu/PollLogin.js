import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import { Card, CardSection, Input, Button, Spinner } from '../common';
import IDnums from '../../JSON/TempID.json';

class PollPage extends Component {
  state = { ID: '', IDmatches: null, alreadyVoted: null, loading: false };

  // componentWillMount() {
  //  //get ID list from firebase
  // }

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

  authLogin() {
    this.setState({ IDmatches: null, alreadyVoted: null, loading: true });
    const len = IDnums.length;

    for (let i = 0; i < len; i++) {
      if (IDnums[i].ID === this.state.ID) {
        this.setState({ IDmatches: true, loading: false, alreadyVoted: IDnums[i].hasVoted });
        break;
      }
      this.setState({ IDmatches: false });
    }
    this.setState({ loading: false, ID: '' });
  }

  nav() {
    if (this.state.IDmatches === true && this.state.alreadyVoted === false) {
      this.props.navigation.navigate('PollPage');
    }
  }

  errorMes() {
    const { errorText } = styles;
    if (this.state.alreadyVoted) {
      return (
        <View>
          <Text style={errorText}>
            You cannot vote again
          </Text>
        </View>
      );
    } else if (this.state.IDmatches === false) {
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
    if (this.state.loading) {
      return (
        <CardSection>
          <Spinner />
        </CardSection>
      );
    }
    return (
      <CardSection>
        <Button
          buttonStyle={styles.buttonStyle}
          textStyle={{ color: 'black' }}
          onPress={() => this.authLogin()}
        >
          Login
        </Button>
      </CardSection>
    );
  }

  render() {
    const { headerStyle } = styles;
    this.nav();
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
            onChangeText={(text) => this.setState({ ID: text })}
            value={this.state.ID}
          />
          {this.renderButton()}
        </Card>
        {this.errorMes()}
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

export default withNavigation(PollPage);
