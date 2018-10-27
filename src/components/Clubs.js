import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Modal } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import clubList from '../JSON/clubList.json';
import { openClub } from '../actions';
import { Button } from './common';

const data = clubList;

class Clubs extends Component {
  state = { showModal: false, key: '001' }

  setModalVisible(visible) {
    this.setState({ showModal: visible });
  }

  modalHandler(item) {
    this.setState({ showModal: true });
    this.props.openClub(item);
    console.log(item);
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
          <View style={{ flex: 1 }} >
            <Text
              style={{ flexWrap: 'nowrap', fontSize: 18 }}
            >
              {item.description.substring(0, 17)}...
            </Text>
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
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onRequestClose={() => console.log('close modal')}
        >
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 40 }}>{this.props.item.name}</Text>
            <Text>Contact {this.props.item.teacher} at {this.props.item.contact}</Text>
            <Button
              onPress={() => { this.setModalVisible(!this.state.showModal); }} 
            >
               Close
            </Button>
          </View>
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
    justifyContent: 'center',
    flex: 1,
  },
};

const mapStateToProps = (state) => {
  const { item } = state.club;
  return { item };
};

export default connect(mapStateToProps, { openClub })(Clubs);
