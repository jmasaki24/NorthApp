import React, { Component } from 'react';
import { StyleSheet, Text, } from 'react-native';
import firebase from 'firebase';
import { Button } from './Button';
import { Card } from './Card';
import { CardSection } from './CardSection';
import { Input } from './Input';
import { Spinner } from './Spinner';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({ error: 'Login Failed.', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderError() {
    if (this.state.error) {
      return <Text style={styles.errorTextStyle}>{this.state.error}</Text>;
    }
    return null;
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <Button
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        onPress={this.onButtonPress.bind(this)}
      >
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <Input
            placeholder="user@email.com"
            label="Email"
            keyboardType="email-address"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
        />

        <Input
          secureTextEntry
          placeholder="password"
          label="Password"
          autoCorrect={false}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <CardSection style={{ borderBottomWidth: 0 }}>
          {this.renderButton()}
        </CardSection>
        {this.renderError()}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  buttonStyle: {
    borderColor: 'white',
	justifyContent: 'center',
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: 'black',
  }
});


export { LoginForm };
