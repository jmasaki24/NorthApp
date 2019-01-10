/**
 * Similar to HomePageItems.js in some, different in lacking redux
 * Author: Jamie Maddock
*/
import React, { Component } from 'react';
import { FlatList, View, Modal, TouchableOpacity, Image, Dimensions, SafeAreaView, Text }
  from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from 'react-native-dotenv';
import { Confirm } from '../common';
import AnnounceCardAllText from '../AnnounceCardAllText';
import AnnounceCardImage from '../AnnounceCardImage';

console.disableYellowBox = true;

const { width } = Dimensions.get('window');
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
      announcementArray: {},
      showModal: false,
      item: {}
    };
    // this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentDidMount() {
    this.getUsersAnnouncements();
  }

  onAccept() {
    this.deleteAnnouncement();
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false, item: {} });
  }

  setDeleteModalVisible(bool, item) {
    this.setState({ showModal: bool, item });
  }

  setImageModalVisible(modal, url) {
    this.setState({ imageModal: modal, imageUrl: url });
  }

  getUsersAnnouncements() {
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    let firebaseData = {};
    const array = [];
    let i = 0;
    return (
      firebase.database().ref(`/Users/${uid}/Announcements`)
        .on('value', snapshot => {
          firebaseData = snapshot.val();
          for (const key in firebaseData) {
            if (firebaseData[key].hasOwnProperty) {
              firebaseData[key].id = key;
              array[i] = firebaseData[key];
              i++;
            }
          }
          this.setState({ announcementArray: array.reverse() });
        })
    );
  }

  deleteAnnouncement() {
    console.log(this.state.item);
    const { item } = this.state.item;
    console.log(item);
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    firebase.database().ref(`/Users/${uid}/Announcements/${this.state.item.id}`).remove()
      .then(() => { console.log('Remove from user succeeded.'); })
      .catch((error) => { console.log(`Remove fuser failed: ${error.message}`); });
    firebase.database().ref(`/Announcements/${this.state.item.id}`).remove()
      .then(() => { console.log('Remove from main succeeded.'); })
      .catch((error) => { console.log(`Remove fmain failed: ${error.message}`); });
    index.deleteObject(this.state.item.id, (err) => console.log(err));
    this.getUsersAnnouncements();
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
          button info={item.info} title={item.title} time={item.dateString}
          onDelPress={this.setDeleteModalVisible.bind(this, true, item)}
          onEditPress={() => this.props.navigation.navigate('EditAnnounce', { item })}
        >
          <Image
            style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
            source={{ uri: item.uri }}
          />
        </AnnounceCardImage>
      );
    }
    return (
      <AnnounceCardAllText
        button info={item.info} title={item.title} time={item.dateString}
        // onEditPress needs to have the fat arrow but for some reason onDelPress can't
        onDelPress={this.setDeleteModalVisible.bind(this, true, item)}
        onEditPress={() => this.props.navigation.navigate('EditAnnounce', { item })}
      >
        {item.info}
      </AnnounceCardAllText>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.titleText}> Your Announcements </Text>
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

const styles = {
  modalBackStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 5,
    marginTop: 5,
    borderWidth: 2,
    padding: 5
  },
  titleText: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 30,
  }
};

export { UsersAnnouncements };
