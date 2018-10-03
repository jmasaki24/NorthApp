import React, { Component } from 'react';
import { FlatList, Image, } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';
import LogoTitans from '../images/logoTitans.jpg';
import announcementData from '../JSON/announcementData.json';
//import firebase from 'firebase';

const data = announcementData;
class HomePage extends Component {
  /*createTagArray() {
    return (arguments);
  }*/

  renderItem({ item }) {
    if (item.hasImage) {
      return (
        <AnnounceCardImage title={item.title} image={{ uri: item.uri }}>
          {item.description}
        </AnnounceCardImage>
      );
    } else if (!item.hasImage) {
      return (
        <AnnounceCardAllText title={item.title}>
          {item.description}
        </AnnounceCardAllText>
      );
    }
  }

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={item => this.renderItem(item)}
      />
    );
  }

  // render() {
  //   return (
  //     firebase.database().ref('/Announcements')
  //       .on()
  //   );
  // }
}

const HomeStack = createStackNavigator({
  Home: HomePage
}, {
  headerLayoutPreset: 'center',
  navigationOptions: {
    headerTitle:
      <Image
        style={{ height: 60, width: 110 }}
        source={LogoTitans}
      />,
    headerStyle: {
      height: 65
    }
  }
});

  export default HomeStack;
