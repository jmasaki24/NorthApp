/**
* author: jamie Maddock
* hate to say i authored this one... it could definitely use a new ui as well as
* not using redux, just r-nav can pass params... then maybe it could a pure component
*/

import React, { Component } from 'react';
import {
  FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import data from '../../JSON/clubList.json';
import { Button, CardSection } from '../common';

class Clubs extends Component {
  state = { showModal: false, club: { name: 'error', description: 'something went wrong' } }

  setModalVisible(visible) {
    this.setState({ showModal: visible });
  }

  modalHandler(item) {
    this.setState({ showModal: true, club: item });
  }

  renderItem({ item }) {
    return (
      <View>
        <TouchableOpacity
          style={styles.listItemContainer}
          onPress={() => this.modalHandler(item)}
        >
          <View style={{ flex: 1 }} >
              <Text style={styles.titleStyle}>{item.name}</Text>
          </View>

          <View style={{ flex: -1, margin: 5 }} >
            <Icon name={'chevron-right'} color={'#000'} size={20} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(data);
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.titleText}>NHSN Clubs</Text>
        <Modal
          visible={this.state.showModal}
          animationType='slide'
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          onRequestClose={() => { this.setModalVisible(!this.state.showModal); }}
          presentationStyle='pageSheet' //for larger devices, only renders a portrait mode width
        >
          <SafeAreaView style={styles.modalContainer}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>
              {this.state.club.name}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 22, padding: 5 }}>
              Contact {this.state.club.teacher} at {this.state.club.contact}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {this.state.club.description}
            </Text>
            <CardSection style={styles.closeButtonStyle}>
              <Button
                buttonStyle={styles.buttonStyle}
                onPress={() => { this.setModalVisible(!this.state.showModal); }}
              >
                 Close
              </Button>
            </CardSection>
          </SafeAreaView>
        </Modal>

        <FlatList
          style={{ flex: 1, backgroundColor: '#FEFEFC' }}
          data={data}
          renderItem={item => this.renderItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 5,
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#888',
    padding: 5,
  },
  titleStyle: {
    fontSize: 20,
    color: '#000',
    margin: 5,
  },
  modalContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    padding: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 50,
  },
  titleText: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 30,
  },
  closeButtonStyle: {
    borderBottomWidth: 0,
    backgroundColor: 'white',
    borderColor: 'white',
  }
});

export { Clubs };
