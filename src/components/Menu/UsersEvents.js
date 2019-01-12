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
import { Confirm, Card, CardSection } from '../common';

console.disableYellowBox = true;

const { width } = Dimensions.get('window');

// need algolia for when you edit i think
const algolia = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY
);
const index = algolia.initIndex(ALGOLIA_INDEX_NAME);

class UsersEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      imageModal: false,
      imageUrl: null,
      eventArray: {},
      showModal: false,
      item: {}
    };
  }

  componentWillMount() {
    this.getUsersEvents();
  }

  onAccept() {
    this.deleteEvent();
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false, item: {} });
  }

  setModalVisible() {
    this.setState({ imageModal: false });
  }

  getUsersEvents() {
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    let firebaseData = {};
    const array = [];
    let i = 0;
    return (
      firebase.database().ref(`/Users/${uid}/Events`)
        .on('value', snapshot => {
          firebaseData = snapshot.val();
          for (const key in firebaseData) {
            if (firebaseData[key].hasOwnProperty) {
              firebaseData[key].id = key;
              array[i] = firebaseData[key];
              i++;
            }
          }
          this.setState({ eventArray: array.reverse() });
        })
    );
  }

  deleteEvent() {
    console.log(this.state.item);
    const { item } = this.state.item;
    console.log(item);
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    firebase.database().ref(`/Users/${uid}/Events/${item.id}`).remove()
      .then(() => { console.log('Remove from user succeeded.'); })
      .catch((error) => { console.log(`Remove fuser failed: ${error.message}`); });
// oh no how do i get to it in the calendar bucket
    firebase.database().ref(`/Calendar/${item.date}/${item.id}`).remove()
      .then(() => { console.log('Remove from main succeeded.'); })
      .catch((error) => { console.log(`Remove fmain failed: ${error.message}`); });
    index.deleteObject(this.state.item.id, (err) => console.log(err));
    this.getUsersEvents();
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.getUsersEvents();
    this.setState({ refreshing: false });
  }

  renderItem({ item }) {
    return (
      <Card>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.cardTitleText}>{item.title}</Text>
        </CardSection>
        <CardSection style={{ borderBottomWidth: 0, flexDirection: 'column' }}>
          <Text style={{ fontSize: 18, flex: 1, color: 'black', alignSelf: 'center' }}>
            {item.location}
          </Text>
          <Text style={{ fontSize: 18, flex: 1, color: 'black' }}>{item.info}</Text>
        </CardSection>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: -1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Icon.Button
              name="edit" iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
              onPress={() => this.props.navigation.navigate('EditEvent', { item })}
            />
            <Icon.Button
              name="trash-alt" iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
              onPress={() => this.setState({ showModal: true, item: { item } })}
            />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: -1 }}>
            <Text style={{ fontSize: 14 }}>
              {item.date} {item.time}
            </Text>
          </View>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.titleText}>Your Events</Text>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.eventArray}
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
  },
  cardTitleText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold'
  },
  titleText: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 30,
  }
};
// export default connect(mapStateToProps, { getUsersEvents })(UsersEvents);

export { UsersEvents };
