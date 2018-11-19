/**
 * Similar to HomePageItems.js in some, different in lacking redux
 * Author: Jamie Maddock
*/
import React, { Component } from 'react';
import { FlatList, View, Modal, TouchableOpacity, Image, Dimensions, SafeAreaView }
  from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import { Confirm } from './common';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';

console.disableYellowBox = true;

const { width } = Dimensions.get('window');

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
  }

  componentWillMount() {
    this.getUsersAnnouncements();
  }

  onAccept() {
    this.deleteAnnouncement();
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false, item: {} });
  }

  setModalVisible() {
    this.setState({ imageModal: false });
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
          this.setState({ announcementArray: array });
        })
    );
  }

  deleteAnnouncement() {
    console.log(this.state.item);
    const { item } = this.state.item;
    console.log(item);
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    firebase.database().ref(`/Users/${uid}/Announcements/${item.id}`).remove()
      .then(() => { console.log('Remove from user succeeded.'); })
      .catch((error) => { console.log(`Remove fuser failed: ${error.message}`); });
    firebase.database().ref(`/Announcements/${item.id}`).remove()
      .then(() => { console.log('Remove from main succeeded.'); })
      .catch((error) => { console.log(`Remove fmain failed: ${error.message}`); });
    this.getUsersAnnouncements();
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.getUsersAnnouncements();
    this.setState({ refreshing: false });
  }

  renderItem({ item }) {
    if (item.isDefault) {
      return (
        <AnnounceCardImage
          button title={item.title} time={item.dateString}
          info={item.info} onPress={() => { this.setState({ showModal: true, item: { item } }); }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ imageModal: true, imageUrl: item.uri })}
          >
            <Image
              style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
              source={{ uri: item.uri }}
            />
          </TouchableOpacity>
        </AnnounceCardImage>
      );
    } else if (item.isDefault === false) {
      return (
        <AnnounceCardImage
          button title={item.title} time={item.dateString}
          info={item.info} onPress={() => { this.setState({ showModal: true, item: { item } }); }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ imageModal: true, imageUrl: item.url })}
          >
            <Image
              style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
              source={{ uri: item.url }}
            />
          </TouchableOpacity>
        </AnnounceCardImage>
      );
    } // if no image, the code below runs
      return (
        <AnnounceCardAllText
          button title={item.title} time={item.dateString}
          onPress={() => { this.setState({ showModal: true, item: { item } }); }}
        >
          {item.info}
        </AnnounceCardAllText>
      );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
          onRequestClose={() => this.setModalVisible}
        >
          <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <TouchableOpacity
              modalBackStyle={styles.modalBackStyle}
              onPress={() => this.setState({ imageModal: false, imageUrl: null })}
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
  }
};
// export default connect(mapStateToProps, { getUsersAnnouncements })(UsersAnnouncements);

export default UsersAnnouncements;
