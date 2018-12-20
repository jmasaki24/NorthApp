import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Input, Button, Spinner } from './common';
import IDnums from '../JSON/TempID.json';

class PollPage extends Component {
  state = { ID: '', IDmatches: null, alreadyVoted: null, loading: false };

  authLogin() {
    const len = IDnums.length;
    this.setState({ loading: true });

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
    console.log(this.state);
    if (this.state.alreadyVoted) {
      return (
        <CardSection>
          <Text>
            You cannot vote again
          </Text>
        </CardSection>
      );
    } else if (this.state.IDmatches === false) {
      return (
        <CardSection>
          <Text>
            Sorry, couldn't login for reasons
          </Text>
        </CardSection>
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
            label='ID#'
            placeholder='000000000'
            keyboardType='number-pad'
            onChangeText={(text) => this.setState({ ID: text })}
            value={this.state.ID}
          />
          {this.renderButton()}
          {this.errorMes()}
        </Card>
      </SafeAreaView>
    );
  }
}

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
  }
};

export default withNavigation(PollPage);
