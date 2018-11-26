import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';
import { Card, CardSection, Input, Button } from './common';
import Titan from '../images/titanT.png';

class SearchPage extends Component {
  state = { SearchText: 'start' };

  onTextChange(text) {
    this.setState({ SearchText: text });
  }

  firebaseSearch() {
    console.log('hi');
    console.log(this.state.SearchText);
    console.log(firebase.database().ref().orderByChild('_searchLastName')
     .startAt(this.state.SearchText)
     .endAt(`${this.state.SearchText}\uf8ff`));
  }

  render() {
    return (
      <View style={{ flex: 0 }}>
        <Card>
          <CardSection>
            <Input
              placeholder="I'm Feeling Lucky"
              value={this.state.SearchText}
              label=''
              viewStyle={{}}
              onChangeText={this.onTextChange.bind(this)}
            />
          </CardSection>
        </Card>
        <Button onPress={this.firebaseSearch}>
          Search me
        </Button>
      </View>
    );
  }
}

/**
databaseReference.orderByChild('_searchLastName')
                 .startAt(queryText)
                 .endAt(queryText+"\uf8ff")
*/

const SearchStack = createStackNavigator({
  Search: SearchPage
}, {
  headerLayoutPreset: 'center',
  navigationOptions: ({ navigation }) => ({
    headerTitle:
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          source={Titan}
          style={{ height: 40, width: 40 }}
        />
      </TouchableOpacity>,
  })
});

export default SearchStack;
