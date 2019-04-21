
import React, { Component } from 'react';
import {
  Animated, Dimensions, Easing, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Button, Card, CardSection, Confirm, Input, Spinner, } from '../common';
import {
  infoAction, titleAction, editAnnouncement, isPushing, addKey, addImage,
  clear, isDefaultImage
} from '../../actions';

const { height } = Dimensions.get('window');


class EAnnounce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      failMsgHeight: new Animated.Value(0),
      waitModalVisible: this.props.isPushingA
    };

    const item = this.props.navigation.getParam('item', 'Item Not Found');
    const id = this.props.navigation.getParam('id', 'Id/key not found');
    this.props.titleAction(item.title);
    this.props.infoAction(item.info);
    this.props.addImage(item.uri);
    this.props.addKey(id);
    this.props.isDefaultImage(item.isDefault);

    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onInfoChange = this.onTitleChange.bind(this);
  }

  componentWillUnmount() { this.props.clear(); }

  onAccept() {
    const { title, info, img, isDefault, id } = this.props;
    this.props.pushingAnnouncement(true);
    this.props.editAnnouncement({ title, info, img, isDefault, id });
    this.setState({ showModal: false });
    // this.props.navigation.pop(); // should not do this is error = true;
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
            resozeMode="contain"
            style={{ height: height / 4, flex: 1 }}
            source={{ uri: this.props.img }}
          />
        </CardSection>
      );
    }
  }

  renderButton() {
    //TODO use react native API NetInfo in conditional to determine if push should be done
    if ((this.props.title.trim() === '') && (this.props.info.trim() === '')) {
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
          onPress={this.onSubmitPress}
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
            Are you sure you would like to change this announcement?
          </Confirm>
        </Card>
        <Modal
          visible={this.state.waitModalVisible}
          transparent
          onRequestClose={() => this.props.isPushing(false)}
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

// TODO: could probably export styles to a root style.js so we aren't redundant. Same for event.
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
  const { title, info, img, isDefault, isPushingA, id, error } = state.announce;
  return { title, info, img, isDefault, isPushingA, id, error };
};

const EditAnnounce = withNavigation(connect(mapStateToProps, {
  infoAction,
  titleAction,
  editAnnouncement,
  isPushing,
  addKey,
  addImage,
  clear,
  isDefaultImage
})(EAnnounce));

export { EditAnnounce };
