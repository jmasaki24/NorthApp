/**
 * Date: 10/29/2018
 * Author: Jamie Maddock
 * this should allow users to create or edit an announcement. code reuse!
 *@param isEdit a bool, passed from navigation. tells if form is going to be used to create or edit
 *@param item only if edit
 *@param id only if edit
*/

import React, { Component } from 'react';
import {
  Animated, Easing, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Button, Card, CardSection, Confirm, Input, Spinner, } from '../common';
import {
  infoAction, titleAction, editAnnouncement, pushAnnouncement, isAnnouncePushing,
  addKey, addImage, clear, isDefaultImage, announceSuccess,
} from '../../actions';

const { height } = Dimensions.get('window');

// named AnnounceF because have to use another name in the export. yes, it's weird.
class AnnounceF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      failMsgHeight: new Animated.Value(0),
      successMsgHeight: new Animated.Value(0),
      waitModalVisible: this.props.isPushingA, // doesn't do anything, but somehow triggers refresh???
      // should be a bool, makes Create default
      isEdit: this.props.navigation.getParam('isEdit', false)
    };
    if (this.state.isEdit) {
      const item = this.props.navigation.getParam('item', 'Item Not Found');
      const id = this.props.navigation.getParam('id', 'Id/key not found');
      this.props.titleAction(item.title);
      this.props.infoAction(item.info);
      this.props.addImage(item.uri);
      this.props.addKey(id);
      this.props.isDefaultImage(true); // isDefault treats image as if its in FB storage
    }
    this.props.announceSuccess(false);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onInfoChange = this.onInfoChange.bind(this);
  }

  componentWillUnmount() { if (this.state.isEdit) this.props.clear(); } // could use Navigation onWillBlur?

  onAccept() {
    const { title, info, img, isDefault, id } = this.props;
    this.props.isAnnouncePushing(true);
    if (this.state.isEdit) {
      this.props.editAnnouncement({ title, info, img, isDefault, id });
    } else {
      this.props.pushAnnouncement({ title, info, img, isDefault });
    }
    this.setState({ showModal: false });
  }

  onDecline() { this.setState({ showModal: false }); }

  onSubmitPress() { this.setState({ showModal: true }); }

  onTitleChange(text) { this.props.titleAction(text); }

  onInfoChange(text) { this.props.infoAction(text); }

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
    const msg = this.state.isEdit ? 'Change Announcement' : 'Submit Announcement';
    //USE react native API NetInfo in conditional to determine if push should be done
    if ((this.props.title.trim() === '' && this.props.info.trim() === '')) {
      return (
        <CardSection>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{msg}</Text>
          </View>
        </CardSection>
      );
    }
    return (
      <CardSection>
        <Button
          buttonStyle={styles.buttonStyle}
          textStyle={{ color: 'black' }}
          onPress={this.onSubmitPress}
        >
        {msg}
        </Button>
      </CardSection>
    );
  }

  render() {
    console.log(this.props.isPushingA);
    const { failMsgHeight, successMsgHeight } = this.state;
    if (this.props.isError) {
      // animate the showing of the failMSG
      failMsgHeight.setValue(0); // reset the animated value
      Animated.timing(failMsgHeight, {
        toValue: (height / 20), // proportional error msg
        duration: 1000,
        easing: Easing.cubic,
      }).start();
    } else {
      // animate the hiding of the failMSG
      Animated.timing(failMsgHeight, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear
      }).start();
    }
    if (this.props.isSuccess) {
      successMsgHeight.setValue(0);
      Animated.timing(successMsgHeight, {
        toValue: (height / 20),
        duration: 1000,
        easing: Easing.cubic,
      }).start();
    } else {
      Animated.timing(successMsgHeight, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear
      }).start();
  }
    return (
    <ScrollView style={{ flex: 1 }}>
      <Animated.View style={{ backgroundColor: '#ff0f0f', height: failMsgHeight }}>
        <Text style={{ color: 'white', fontSize: 20, margin: 5, alignSelf: 'center' }}>
          Error: could not send to server
        </Text>
      </Animated.View>
      <Animated.View style={{ backgroundColor: '#228B22', height: successMsgHeight }}>
        <Text style={{ color: 'white', fontSize: 20, margin: 5, alignSelf: 'center' }}>
          Success!
        </Text>
      </Animated.View>
      <Card>
        <Input
          label="Title"
          placeholder="Title"
          blurOnSubmit
          inputFlexNum={4}
          multiline
          onChangeText={this.onTitleChange}
          returnKeyType="done"
          value={this.props.title}
        />
        <Input
          label="Text"
          placeholder="Info Goes Here"
          blurOnSubmit
          inputFlexNum={4}
          multiline
          onChangeText={this.onInfoChange}
          returnKeyType="done"
          value={this.props.info}
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
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          {
            this.props.isEdit ? 'Are you sure you would like to add this announcement?'
            : 'Are you sure you would like to change this announcement'
          }
        </Confirm>
      </Card>
      <Modal
        visible={false}
        transparent
        onRequestClose={() => this.props.isAnnouncePushing(false)}
      >
        <SafeAreaView style={styles.waitModalViewStyle}>
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
  waitModalViewStyle: {
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
  const { title, info, img, isDefault, isPushingA, isSuccess, id, isError } = state.announce;
  return { title, info, img, isDefault, isPushingA, isSuccess, id, isError };
};

const AnnounceForm = withNavigation(connect(mapStateToProps, {
  infoAction,
  titleAction,
  editAnnouncement,
  pushAnnouncement,
  isAnnouncePushing,
  addKey,
  addImage,
  clear,
  isDefaultImage,
  announceSuccess,
})(AnnounceF));

export { AnnounceForm };
