/**
* Date: 10/29/2018
* Author: Matt Peters
*/

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView, Modal, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Input, Button, Confirm, Spinner } from '../common';
import { addDescription, addTitle, pushAnnouncement, pushToFBStorage, pushingBool }
  from '../../actions';

const { height, width } = Dimensions.get('window');

class AddContent extends Component {
  state = { showModal: false };

  onAccept() {
    const { title, info, uri, isDefault } = this.props;
    this.props.pushAnnouncement({ title, info, uri, isDefault });
    this.setState({ showModal: false });
    this.props.pushingBool(true);
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onTitleChange(text) {
    console.log('Got to onTitleChange');
    this.props.addTitle(text);
  }

  onInfoChange(text) {
    console.log('Got to onInfoChange');
    this.props.addDescription(text);
  }

  // setShowModalVisible(bool) {
  //   this.setState({ showModal: bool });
  // }

  selectedImageDisplay() {
    if (this.props.uri !== '') {
      return (
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ height: height / 4, width: width / 2.5 }}
            source={{ uri: this.props.uri }}
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
          onPress={this.setState({ showModal: !this.state.showModal })}
        >
          Submit Announcement
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <CardSection>
            <Input
              label="Title"
              placeholder="Title"
              viewStyle={{ height: 60 }}
              multiline
              //onChangeText={(text) => this.onTitleChange(text)}
              onChangeText={this.onTitleChange.bind(this)}
              //value={this.props.title}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Text"
              placeholder="Info Goes Here"
              viewStyle={{ height: 150 }}
              multiline
              onChangeText={this.onInfoChange.bind(this)}
              //value={this.props.info}
            />
          </CardSection>
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

          <Modal
            visible={this.props.pushing}
            transparent
            onRequestClose={() => console.log('yea lol')}
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
        </Card>
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

const mapStateToProps = ({ announce }) => {
  const { title, info, uri, isDefault, pushing } = announce;
  return { title, info, uri, isDefault, pushing };
};

export default withNavigation(connect(mapStateToProps,
  { addDescription, addTitle, pushAnnouncement, pushToFBStorage, pushingBool })(AddContent));
