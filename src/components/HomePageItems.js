/**
 * Used to handle the render of Announcements seperately, as the react-navigation
 * props got mixed up with the redux props
 * Date: 10/29/2018
 * Author: Matt Peters
 */
import React, { Component } from 'react';
import {
  FlatList, View, Modal, TouchableOpacity, Image, Dimensions, SafeAreaView, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';
import { getAnnouncements } from '../actions';

console.disableYellowBox = true;

const { width } = Dimensions.get('window');

class HomePageItems extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false, imageModal: false, imageUri: null };
  }

  componentWillMount() {
    this.props.getAnnouncements();
  }

  setModalVisible() {
    this.setState({ imageModal: false });
  }
  // I would rather have no state change, and have a shouldComponentUpdate so that we don't have
  // to re-render every single announcement every time we refresh unless there's something new
  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getAnnouncements();
    this.setState({ refreshing: false });
  }

  pressableImage(item) {
    if (item.isDefault) {
      return (
        <Image
          style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
          source={{ uri: item.uri }}
        />
      );
    }
    return (
      <TouchableOpacity
        onPress={() => this.setState({ imageModal: true, imageUri: item.uri })}
      >
        <Image
          style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
          source={{ uri: item.uri }}
        />
      </TouchableOpacity>
    );
  }

  renderItem({ item }) {
    if (item.uri !== '') {
      if (item.isDefault === false) {
        return (
          <AnnounceCardImage title={item.title} time={item.dateString} info={item.info}>
            <TouchableOpacity
              onPress={() => this.setState({ imageModal: true, imageUri: item.uri })}
            >
              <Image
                style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
                source={{ uri: item.uri }}
              />
            </TouchableOpacity>
          </AnnounceCardImage>
        );
      } else if (item.isDefault === true) {
        return (
          <AnnounceCardImage title={item.title} time={item.dateString} info={item.info}>
            <Image
              style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
              source={{ uri: item.uri }}
            />
          </AnnounceCardImage>
        );
      }
    }
    return (
      <AnnounceCardAllText title={item.title} time={item.dateString}>
        {item.info}
      </AnnounceCardAllText>
    );
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
              onPress={() => this.setState({ imageModal: false, imageUri: null })}
            >
              <View style={{ flex: -1, margin: 5, paddingLeft: 10, alignContent: 'flex-start' }}>
                <Icon name={'chevron-left'} color={'white'} size={30} />
              </View>
            </TouchableOpacity>
            <Image
              style={{ flex: 0, height: width, width, alignSelf: 'center', alignContent: 'center' }}
              source={{ uri: this.state.imageUri }}
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
  }
});

const mapStateToProps = (state) => {
  const data = Object.values(state.HPannouncements).reverse();
  return { data };
};

export default connect(mapStateToProps, { getAnnouncements })(HomePageItems);
