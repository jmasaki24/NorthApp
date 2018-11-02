/**
 * Used to handle the render of Announcements seperately, as the react-navigation
 * props got mixed up with the redux props
 * Date: 10/29/2018
 * Author: Matt Peters
 */

import React, { Component } from 'react';
import { FlatList, View, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';
import { getAnnouncements } from '../actions';
import { Button } from './common';

console.disableYellowBox = true;

const { height, width } = Dimensions.get('window');

class HomePageItems extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false, imageModal: false, url: null };
  }

  componentWillMount() {
    this.props.getAnnouncements();
    //console.log(getAnnouncements());
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getAnnouncements().then(this.setState({ refreshing: false }));
  }

  renderItem({ item }) {
    if (item.isDefault) {
      return (
        <AnnounceCardImage title={item.title} image={{ uri: item.uri }} time={item.dateString}>
          {item.info}
        </AnnounceCardImage>
      );
    } else if (item.isDefault === false) {
      return (
        <AnnounceCardImage title={item.title} time={item.dateString} info={item.info}>
          <TouchableOpacity
            onPress={() => this.setState({ imageModal: true, url: item.url })}
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
    console.log(`width: ${width}`);
    console.log(`height: ${height}`);
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
          onRequestClose={console.log('Close Image')}
        >
          <View style={{ backgroundColor: 'black', flex: 1 }}>
            <Image
              style={{ flex: 0, height: height / 10, width: width / 5, alignSelf: 'center', alignContent: 'center' }}
              source={{ uri: this.state.url }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const data = Object.values(state.HPannouncements).reverse();
  return { data };
};

export default connect(mapStateToProps, { getAnnouncements })(HomePageItems);
