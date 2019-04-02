/**
* Date: 10/29/2018
* Author: Matt Peters
*/

import React, { Component } from 'react';
import {
  Animated, Easing, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Button, Card, CardSection, Confirm, Input, Spinner, } from '../common';
import {
  infoAction, titleAction, pushAnnouncement, pushingAnnouncement
} from '../../actions';

const { width, height } = Dimensions.get('window');

// named CAnnounce because have to use another name in the export. yes, it's weird.
class CAnnounce extends Component {
  state = { showModal: false, failMsgHeight: new Animated.Value(0) };

  onAccept() {
    const { title, info, img, isDefault } = this.props;
    this.props.pushingAnnouncement(true);
    this.props.pushAnnouncement({ title, info, img, isDefault });
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onSubmitPress() {
    this.setState({ showModal: true });
  }

  onTitleChange(text) {
    this.props.titleAction(text);
  }

  onInfoChange(text) {
    this.props.infoAction(text);
  }

  selectedImageDisplay() {
    if (this.props.img) {
      return (
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: height / 4, flex: 1 }}
            source={{ uri: this.props.img }}
          />
        </CardSection>
      );
    }
  }

  renderButton() {
    //USE react native API NetInfo in conditional to determine if push should be done
    if ((this.props.title === '') && (this.props.info === '')) {
      return (
        <CardSection>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Submit Announcement</Text>
          </View>
        </CardSection>
      );
    }
    return (
      <CardSection>
        <Button
          buttonStyle={styles.buttonStyle}
          textStyle={{ color: 'black' }}
          onPress={this.onSubmitPress.bind(this)}
        >
          Submit Announcement
        </Button>
      </CardSection>
    );
  }

  render() {
    const { failMsgHeight } = this.state;
    if (this.props.error) {
      // animate the showing of the failMSG
      failMsgHeight.setValue(0); // reset the animated value
      Animated.spring(failMsgHeight, {
        toValue: (height / 20), // proportional error msg
        friction: 4
      }).start();
    } else {
      // animate the hiding of the failMSG
      Animated.timing(failMsgHeight, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear
      }).start();
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        <Animated.View style={{ backgroundColor: '#ff0f0f', height: failMsgHeight }}>
          <Text style={{ color: 'white', fontSize: 20, margin: 5, alignSelf: 'center' }}>
            Error: could not push
          </Text>
        </Animated.View>
        <Card>
          <Input
            label="Title"
            placeholder="Title"
            multiline
            onChangeText={this.onTitleChange.bind(this)}
            value={this.props.title}
            inputFlexNum={4}
            returnKeyType="done"
          />
          <Input
            label="Text"
            placeholder="Info Goes Here"
            multiline
            onChangeText={this.onInfoChange.bind(this)}
            value={this.props.info}
            inputFlexNum={4}
            returnKeyType="done"
          />
          {this.selectedImageDisplay()}
          <CardSection>
            <Button
              buttonStyle={styles.buttonStyle}
              textStyle={{ color: 'black' }}
              onPress={() => this.props.navigation.navigate('DefaultImages')}
            >
              Select An Image
            </Button>
          </CardSection>
          {this.renderButton()}

          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are you sure you would like to add this content?
          </Confirm>
        </Card>
        <Modal
          visible={false} // this.props.isPushingA
          transparent
          onRequestClose={() => this.props.pushingAnnouncement(false)}
        >
          <SafeAreaView style={styles.pushingViewStyle}>
            <View style={{ alignSelf: 'center', alignContent: 'center', height: 100 }}>
              <Spinner style={{ flex: -1 }} />
              <View style={{ flex: -1 }}>
                <Text style={{ fontSize: 20, color: 'lightgrey' }}>Please Wait...</Text>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  pushingViewStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  const { title, info, img, isDefault, isPushingA, error } = state.announce;
  return { title, info, img, isDefault, isPushingA, error };
};

const CreateAnnounce = withNavigation(connect(mapStateToProps, {
  infoAction,
  titleAction,
  pushAnnouncement,
  pushingAnnouncement,
})(CAnnounce));

export { CreateAnnounce };
