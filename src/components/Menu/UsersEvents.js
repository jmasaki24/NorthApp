/**
 * Similar to HomePageItems.js in some, different in lacking redux
 * Author: Jamie Maddock
*/
import React, { Component } from 'react';
import {
  Animated, Dimensions, Easing, FlatList, Image, Modal, SafeAreaView,
  StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from 'react-native-dotenv';
import { Confirm, Card, CardSection } from '../common';

console.disableYellowBox = true;

const { width, height } = Dimensions.get('window');

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
      item: {
        inital: {
        title: 'Not Connected',
        info: 'Please wait or connect to the Internet',
        img: '',
        isDefault: null
        }
      },
      failMsgHeight: new Animated.Value(0),
      deleteFail: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
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
          for (const key in firebaseData) { // .map()???
            const has = firebaseData[key].hasOwnProperty;
            if (has) {
              firebaseData[key].key = key; //named key for FlatList
              array[i] = firebaseData[key];
              i++;
            }
          }
          this.setState({ eventArray: array.reverse() });
        })
    );
  }

  deleteEvent() {
    const { item } = this.state.item;
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    Promise.all([
      firebase.database().ref(`/Users/${uid}/Events/${item.key}`).remove(),
      firebase.database().ref(`/Calendar/${item.date}/${item.key}`).remove(),
      index.deleteObject(item.key)
    ]).then(() => {
      this.getUsersEvents();
      this.setState({ item: {} });
    })
    .catch(() => this.setState({ deleteFail: true, item: {} }));
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.getUsersEvents();
    this.setState({ refreshing: false });
  }

  renderItem({ item }) {
    return (
      <Card key={item.key}>
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
          <View style={{ flex: -1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ flex: -1 }}>
              <Text style={{ fontSize: 14 }}>
                {item.date} {item.time}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <Icon.Button
              name="edit" iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
              onPress={() => this.props.navigation.navigate('EditEvent', { item, id: item.key })}
            />
            <Icon.Button
              name="trash-alt" iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
              onPress={() => this.setState({ showModal: true, item: { item } })}
            />
          </View>

        </CardSection>
      </Card>
    );
  }

  render() {
    const { failMsgHeight, deleteFail } = this.state;
    if (deleteFail) {
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Animated.View style={{ backgroundColor: '#ff0f0f', height: failMsgHeight }}>
          <Text style={{ color: 'white', fontSize: 20, margin: 5, alignSelf: 'center' }}>
            Error
          </Text>
        </Animated.View>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.eventArray}
          renderItem={item => this.renderItem(item)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Are you sure you would like to delete this content? This is permanent.
        </Confirm>
        <Modal
          visible={this.state.imageModal}
          onRequestClose={this.setModalVisible}
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
  cardTitleText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
// export default connect(mapStateToProps, { getUsersEvents })(UsersEvents);

export { UsersEvents };
