import React, { Component } from 'react';
import {
  Animated, Dimensions, Easing, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Button, Card, CardSection, Confirm, Input, Spinner, } from '../common';
import {
  infoAction, titleAction, editAnnouncement, pushingAnnouncement, addKey, addImage,
  clear, isDefaultImage
} from '../../actions';

const { height, width } = Dimensions.get('window');


class EAnnounce extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, failMsgHeight: new Animated.Value(0) };

    const item = this.props.navigation.getParam('item', 'Item Not Found');
    const id = this.props.navigation.getParam('id', 'Id/key not found');
    this.props.titleAction(item.title);
    this.props.infoAction(item.info);
    this.props.addImage(item.uri);
    this.props.addKey(id);
    this.props.isDefaultImage(item.isDefault);
    console.log(this.props);
  }


  componentWillUnmount() {
    this.props.clear();
  }

  onAccept() {
    const { title, info, img, isDefault, id } = this.props;
    this.props.editAnnouncement({ title, info, img, isDefault, id });
    this.setState({ showModal: false });
    this.props.pushingAnnouncement(true);
    this.props.navigation.pop();
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
            resozeMode="contain"
            style={{ height: height / 4, flex: 1 }}
            source={{ uri: this.props.img }}
          />
        </CardSection>
      );
    }
  }

  renderButton() {
    //USE react native API NetInfo in conditional to determine if push should be done
    // WARNING: user can just put a space ' ' and they can push
    if ((this.props.title === '') && (this.props.info === '')) {
      return (
        <CardSection>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Change Announcement</Text>
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
          Change Announcement
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
        <Card>
          <Input
            label="Title"
            placeholder="Title"
            multiline
            onChangeText={this.onTitleChange.bind(this)}
            value={this.props.title}
            returnKeyType="done"
          />
          <Input
            label="Text"
            placeholder="Info Goes Here"
            multiline
            onChangeText={this.onInfoChange.bind(this)}
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
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are you sure you would like to change this announcement?
          </Confirm>
        </Card>
        <Modal
          visible={this.props.isPushingA}
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

// TODO: could probably export styles to a root style.js so we aren't redundant. Same for event.
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
  const { title, info, img, isDefault, isPushingA, id, error } = state.announce;
  return { title, info, img, isDefault, isPushingA, id, error };
};

const EditAnnounce = withNavigation(connect(mapStateToProps, {
  infoAction,
  titleAction,
  editAnnouncement,
  pushingAnnouncement,
  addKey,
  addImage,
  clear,
  isDefaultImage
})(EAnnounce));

export { EditAnnounce };
