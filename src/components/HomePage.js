import React, { Component } from 'react';
import { View, ScrollView, Image, } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ScoreCard from './ScoreCard';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';
import LogoTitans from '../images/logoTitans.jpg';

class HomePage extends Component {
  /*createTagArray() {
    return (arguments);
  }*/

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showVerticalScrollIndicator>
          <AnnounceCardAllText title="Snow Day MM/DD/YYYY!">
            Yay Snow Day! Yay Snow Day! Yay Snow Day! Yay Snow Day!
            Yay Snow Day! Yay Snow Day! Yay Snow Day! Yay Snow Day!
          </AnnounceCardAllText>
          <ScoreCard
            otherTeam="Panthers"
            ourScore="14"
            theirScore="10"
          />
          <AnnounceCardImage
            title="North App Coming Soon, Maybe!"
            uri="https://schoolassets.s3.amazonaws.com/logos/21551/21551.png"
            //tags=createTagArray('#newtech', '#bigmoves');
          >
            Lets see how soon we can get this done!
            Hopefully it will be the end of first semester this year.
          </AnnounceCardImage>
          <AnnounceCardAllText title="Spirit Week 9/24">
            Spirit Week! Get Hyped!
            Battle of the bridge 9/28!
            Powderpuff 10/22!
          </AnnounceCardAllText>
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }
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
