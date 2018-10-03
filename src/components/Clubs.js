import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import clubList from '../JSON/clubList.json';

const data = clubList;

class Clubs extends Component {
  state = { showModal: false, key: '001' }

  setModalVisible(visible) {
    this.setState({ showModal: visible });
  }

  renderItem({ item }) {
    return (
      <View>
        <Modal
          visible={this.state.showModal}
          animationType='slide'
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onRequestClose={() => console.log('close modal')}
        >
          <View>
            <Text style={{ fontSize: 40 }}>{item.title}</Text>
            <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.showModal); }}>
              <Text> Close </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.setState({ showModal: true, key: item.key })}
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
  buttonContainer: {
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
  }
};

export default Clubs;
