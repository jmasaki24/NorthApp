import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Card, CardSection, Input } from './common';
import Titan from '../images/titanT.png';

class SearchPage extends Component {
  state = { SearchText: '' };
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="I'm Feeling Lucky"
            value={this.state.SearchText}
            label=''
            viewStyle={{}}
            onChangeText={SearchText => this.setState({ SearchText })}
          />
        </CardSection>
      </Card>
    );
  }
}

const SearchStack = createStackNavigator({
  Search: SearchPage
}, {
  headerLayoutPreset: 'center',
  navigationOptions: {
    headerTitle:
      <Image
        source={Titan}
        style={{ height: 40, width: 40 }}
      />
  }
});

export default SearchStack;
