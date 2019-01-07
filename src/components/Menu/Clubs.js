import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Modal, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import clubList from '../../JSON/clubList.json';
import { openClub } from '../../actions';
import { Button, CardSection } from '../common';

const data = clubList;

class ClubList extends Component {
  state = { showModal: false, key: '001' }

  setModalVisible(visible) {
    this.setState({ showModal: visible });
  }

  modalHandler(item) {
    this.setState({ showModal: true });
    this.props.openClub(item);
    // console.log(item);
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
    return (
      <View style={{ flex: 1 }}>
        <Modal
          visible={this.state.showModal}
          animationType='slide'
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          onRequestClose={() => { this.setModalVisible(!this.state.showModal); }}
          presentationStyle='pageSheet' //for larger devices, only renders a portrait mode width
        >
          <SafeAreaView style={styles.modalContainer}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>
              {this.props.item.name}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 22, padding: 5 }}>
              Contact {this.props.item.teacher} at {this.props.item.contact}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {this.props.item.description}
            </Text>
            <CardSection style={{ borderBottomWidth: 0, backgroundColor: 'white', borderColor: 'white' }}>
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

const styles = {
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
    textDecorationLine: 'underline',
  },
  modalContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    padding: 20
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 50
  }
};

const mapStateToProps = (state) => {
  const { item } = state.club;
  return { item };
};

const Clubs = connect(mapStateToProps, { openClub })(ClubList);

export { Clubs };
