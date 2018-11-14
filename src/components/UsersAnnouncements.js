/**
 * Basically copied HomePageItems.js
 * Author: Jamie Maddock
*/
import React, { Component } from 'react';
import { FlatList, View, Modal, TouchableOpacity, Image, Dimensions, SafeAreaView }
  from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';

console.disableYellowBox = true;

const { width } = Dimensions.get('window');

class UsersAnnouncements extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false, imageModal: false, imageUrl: null, announcementArray: [] };
  }
  componentWillMount() {
    this.getUsersAnnouncements();
  }

  setModalVisible() {
    this.setState({ imageModal: false });
  }

  getUsersAnnouncements() {
    const { currentUser } = firebase.auth();
    const uid = currentUser.uid;
    return () => {
      firebase.database().ref(`/Users/${uid}/Announcements`)
        .on('value', (snapshot) => {
          this.setState({ announcementArray: snapshot.val() });
          console.log(snapshot.val());
        });
    };
}

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.getUsersAnnouncements();
    //this.setState({ refreshing: false });
  }

  renderItem({ item }) {
    console.log(this.props.data);
    if (item.isDefault) {
      return (
        <AnnounceCardImage
        title={item.title} image={{ uri: item.uri }} time={item.dateString} info={item.info}
        />
      );
    } else if (item.isDefault === false) {
      return (
        <AnnounceCardImage title={item.title} time={item.dateString} info={item.info}>
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
    } else if (item.uri === '') {
      return (
        <AnnounceCardAllText title={item.title} time={item.dateString}>
          {item.info}
        </AnnounceCardAllText>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.data}
          renderItem={item => this.renderItem(item)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
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
