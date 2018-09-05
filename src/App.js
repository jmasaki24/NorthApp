import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { HeaderTitan, Footer } from './components/common';
import Features from './components/features';
import ScoreCard from './components/ScoreCard';
import AnnounceCardAllText from './components/AnnounceCardAllText';
import AnnounceCardImage from './components/AnnounceCardImage';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderTitan />
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
        <Footer>
          <Text>Foot</Text>
        </Footer>
      </View>
    );
  }
}

export default App;
