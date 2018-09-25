import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Input, Button, Confirm } from './common';

class AddContent extends Component {
  state = { Title: '', Info: '', showModal: false };

  onAccept() {
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  renderButton() {
    if (this.state.Title !== '' && this.state.Info !== '') {
      return (
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            Submit Announcement
          </Button>
        </CardSection>
      );
    }
    return (
      <CardSection>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Submit Announcement</Text>
        </View>
      </CardSection>
    );
  }


  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Title"
            placeholder="Title"
            viewStyle={{ height: 60 }}
            multiline
            value={this.state.Title}
            onChangeText={(Title) => this.setState({ Title })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Text"
            placeholder="Info Goes Here"
            viewStyle={{ height: 150 }}
            multiline
            value={this.state.Info}
            onChangeText={(Info) => this.setState({ Info })}
          />
        </CardSection>
        {this.renderButton()}
        <View style={{ alignItems: 'flex-end' }}>
          <CardSection>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={{ color: 'black' }}
              onPress={() => firebase.auth().signOut()}
            >
              Log Out
            </Button>
          </CardSection>
        </View>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you would like to add this content?
        </Confirm>
      </Card>
    );
  }
}

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1
  },
  textStyle: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center',
  }
};

export default AddContent;
