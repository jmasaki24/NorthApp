/**
 * Similar to HomePageItems.js in some, different in lacking redux
 * Author: Jamie Maddock
*/
import React, { Component } from 'react';
import {
  Animated, Dimensions, Easing, FlatList, Image, Modal, SafeAreaView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME, } from 'react-native-dotenv';
import { Confirm, } from '../common';
import AnnounceCardAllText from '../AnnounceCardAllText';
import AnnounceCardImage from '../AnnounceCardImage';

console.disableYellowBox = true;

const { width, height } = Dimensions.get('window');
// need algolia for when you edit i think
const algolia = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY
);
const index = algolia.initIndex(ALGOLIA_INDEX_NAME);

class UsersAnnouncements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      imageModal: false,
      imageUrl: null,
      announcementArray: [{
        title: 'Not Connected',
        info: 'Please wait or connect to the Internet',
        img: '',
        isDefault: null,
      }],
      showModal: false,
      failMsgHeight: new Animated.Value(0),
      deleteFail: false,
    };
    this.setImageModalVisible = this.setImageModalVisible.bind(this);
    this.setDeleteModalVisible = this.setDeleteModalVisible.bind(this);
  }

  componentDidMount() { this.getUsersAnnouncements(); }

  onAccept() {
    this.deleteAnnouncement();
    this.setState({ showModal: false });
  }

  onDecline() { this.setState({ showModal: false, item: {} }); }

  setDeleteModalVisible(bool, item) { this.setState({ showModal: bool, item }); }

  setImageModalVisible(modal, url) { this.setState({ imageModal: modal, imageUrl: url }); }

  getUsersAnnouncements() {
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    let firebaseData = {};
    const array = [];
    let i = 0;
    return (
      firebase.database().ref(`/Users/${uid}/Announcements`)
        .once('value', snapshot => {
          firebaseData = snapshot.val();
          console.log(firebaseData);
          Object.keys(firebaseData).forEach(key => {
            // firebaseData[key].key = key; don't need bc its storedas key? (for flatlist)
            array[i] = firebaseData[key];
            i++;
          this.setState({ announcementArray: array.reverse() });
        });
      }));
  }

  deleteAnnouncement() {
    const { item } = this.state;
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    Promise.all([
      firebase.database().ref(`/Users/${uid}/Announcements/${item.key}`).remove(),
      firebase.database().ref(`/Announcements/${item.key}`).remove(),
      index.deleteObject(item.key)
    ]).then(() => {
      this.setState({ item: {}, deleteFail: false, announcementArray: {} });
      this.getUsersAnnouncements();
    })
    .catch(() => {
      this.setState({ deleteFail: true, item: {} });
    });
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.getUsersAnnouncements();
    // TODO: make getUsersAnnouncements() return a promise
    this.setState({ refreshing: false });
  }

  renderItem({ item }) {
    if (item.hasOwnProperty('uri')) {
      return (
        <AnnounceCardImage
          button info={item.info} title={item.title} time={item.dateString} uri={item.uri}
          onDelPress={() => this.setDeleteModalVisible(true, item)}
          onEditPress={() => this.props.navigation.navigate('AnnounceForm', { isEdit: true, item, id: item.key })}
        />
      );
    }
    return (
      <AnnounceCardAllText
        button info={item.info} title={item.title} time={item.dateString}
        // onEditPress needs the fat arrow else it gets called but for some reason onDelPress can't
        onDelPress={() => this.setDeleteModalVisible(true, item)}
        onEditPress={() => this.props.navigation.navigate('AnnounceForm', { isEdit: true, item, id: item.key })}
      >
        {item.info}
      </AnnounceCardAllText>
    );
  }

  render() {
    const { failMsgHeight, deleteFail } = this.state;
    if (deleteFail) {
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
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF' }}>
      <Animated.View style={{ backgroundColor: '#ff0f0f', height: failMsgHeight }}>
        <Text style={{ color: 'white', fontSize: 20, margin: 5, alignSelf: 'center' }}>
          Error
        </Text>
      </Animated.View>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.announcementArray}
          renderItem={item => this.renderItem(item)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you would like to delete this content? This is permanent.
        </Confirm>
        <Modal
          visible={this.state.imageModal}
          onRequestClose={this.setImageModalVisible.bind(this, false, null)}
        >
          <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <TouchableOpacity
              modalBackStyle={styles.modalBackStyle}
              onPress={this.setImageModalVisible.bind(this, false, null)}
            >
              <View style={{ flex: -1, margin: 5, paddingLeft: 10, alignContent: 'flex-start' }}>
                <Icon name={'chevron-left'} color={'white'} size={30} />
              </View>
            </TouchableOpacity>
            <Image
              style={{ flex: 0, height: width, width, alignSelf: 'center', alignContent: 'center' }}
              source={{ uri: this.state.imageUrl }}
            />
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalBackStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 5,
    marginTop: 5,
    borderWidth: 2,
    padding: 5,
  },
});

export { UsersAnnouncements };
