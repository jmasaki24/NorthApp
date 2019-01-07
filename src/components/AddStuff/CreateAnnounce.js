/**
* Date: 10/29/2018
* Author: Matt Peters
*/

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView, Modal, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Input, Button, Confirm, Spinner } from '../common';
import { infoAction, titleAction, pushAnnouncement, pushingBool }
  from '../../actions';

const { height, width } = Dimensions.get('window');

// named CAnnounce because have to use another name in the export. yes, it's weird...
class CAnnounce extends Component {
  state = { showModal: false };

  onAccept() {
    const { title, info, img, isDefault } = this.props;
    this.props.pushAnnouncement({ title, info, img, isDefault });
    this.setState({ showModal: false });
    this.props.pushingBool(true);
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onSubmitPress() {
    this.setState({ showModal: true });
  }

  onTitleChange(text) {
    // console.log(text);
    this.props.titleAction(text);
  }

  onInfoChange(text) {
    // console.log(text);
    this.props.infoAction(text);
  }

  selectedImageDisplay() {
    if (this.props.img !== '') {
      return (
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ height: height / 4, width: width / 2.5 }}
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
    // console.log(`render called ${this.props.title}`);
    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <Input
            label="Title"
            placeholder="Title"
            multiline
            onChangeText={this.onTitleChange.bind(this)}
            value={this.props.title}
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
            Are you sure you would like to add this content?
          </Confirm>
        </Card>
        <Modal
          visible={this.props.pushing}
          transparent
          onRequestClose={() => console.log('close pushing modal')}
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

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1
  },
  pushingViewStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

const mapStateToProps = (state) => {
  const { title, info, img, isDefault, pushing } = state.announce;
  // console.log(state.announce);
  return { title, info, img, isDefault, pushing };
};

const CreateAnnounce = withNavigation(connect(mapStateToProps, {
  infoAction,
  titleAction,
  pushAnnouncement,
  pushingBool
})(CAnnounce));

export { CreateAnnounce };
