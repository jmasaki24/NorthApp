import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView, Modal, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card, CardSection, Input, Button, Confirm, Spinner } from '../common';
import { infoAction, titleAction, editAnnouncement, pushingBool, addID, addImage, clear }
  from '../../actions';

const { height, width } = Dimensions.get('window');


class EAnnounce extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };

    const item = this.props.navigation.getParam('item', 'Item Not Found');
    console.log(item);
    this.props.titleAction(item.title);
    this.props.infoAction(item.info);
    this.props.addImage(item.uri);
    this.props.addID(item.id);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  onAccept() {
    const { title, info, img, isDefault, id } = this.props;
    this.props.editAnnouncement({ title, info, img, isDefault, id });
    this.setState({ showModal: false });
    this.props.pushingBool(true);
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
            style={{ height: height / 4, width: width / 2.5 }}
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
    console.log(this.props);
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
            Are you sure you would like to change this announcement?
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
  const { title, info, img, isDefault, pushing, id } = state.announce;
  return { title, info, img, isDefault, pushing, id };
};

const EditAnnounce = withNavigation(connect(mapStateToProps, {
  infoAction,
  titleAction,
  editAnnouncement,
  pushingBool,
  addID,
  addImage,
  clear
})(EAnnounce));

export { EditAnnounce };
