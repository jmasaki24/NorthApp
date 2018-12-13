/**
 * Used to handle the render of Announcements seperately, as the react-navigation
 * props got mixed up with the redux props
 * Date: 10/29/2018
 * Author: Matt Peters
 */
import React, { Component } from 'react';
import { FlatList, View, Modal, TouchableOpacity, Image, Dimensions, SafeAreaView }
  from 'react-native';
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
    this.state = { refreshing: false, imageModal: false, imageUrl: null };
  }

  componentWillMount() {
    this.props.getAnnouncements();
  }

  setModalVisible() {
    this.setState({ imageModal: false });
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getAnnouncements();
    this.setState({ refreshing: false });
  }

  // The difference between isDefault is item.uri and item.url
  // We're going to clean this up later (JM and MP)
  renderItem({ item }) {
    if (item.isDefault) {
      return (
        <AnnounceCardImage title={item.title} time={item.dateString} info={item.info}>
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
    }
      return (
        <AnnounceCardAllText title={item.title} time={item.dateString}>
          {item.info}
        </AnnounceCardAllText>
      );
  }

  render() {
    console.log(this.props.data);
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

const mapStateToProps = (state) => {
  const data = Object.values(state.HPannouncements).reverse();
  return { data };
};

export default connect(mapStateToProps, { getAnnouncements })(HomePageItems);
