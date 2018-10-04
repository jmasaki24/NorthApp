import React, { Component } from 'react';
import { View, ScrollView, Linking, FlatList } from 'react-native';
import { Card, CardSection, Button } from './common';
import SeasonSelect from './AthleticsDetails/SeasonSelect';

class AthleticsPage extends Component {
  renderItem() {
    return <CardSection style={{ width: 75, height: 50, borderRightWidth: 3 }} /> ;
  }

  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Card style={{ marginBottom: 20 }}>
          <CardSection>
            <Button buttonStyle={buttonStyle} textStyle={buttonTextStyle}>
              Upcoming Games
            </Button>
          </CardSection>
          <FlatList
            style={{ flexDirection: 'row', }}
            item={item => renderItem()}

          />
        </Card>
        <SeasonSelect />
        <View style={{ height: 20 }} />
        <Card>
          <CardSection>
            <Button
              buttonStyle={buttonStyle}
              textStyle={buttonTextStyle}
              onPress={() => Linking.openURL('https://www.nashuanorthathletics.com/siteRepository/21551/userfiles/North-Coaches-2018-19.pdf')}
            >
              Coach Directory
            </Button>
          </CardSection>
          <CardSection>
            <Button
              buttonStyle={buttonStyle}
              textStyle={buttonTextStyle}
              onPress={() => Linking.openURL('https://www.nashuanorthathletics.com/main/otherad/contentID/41289580')}
            >
              Policies
            </Button>
          </CardSection>
          <CardSection>
            <Button
              buttonStyle={buttonStyle}
              textStyle={buttonTextStyle}
              onPress={() => Linking.openURL('https://www.familyid.com/programs/high-school-north-winter-2018-19')}
            >
              Signup/Registration
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    color: 'black'
  }
};

export default AthleticsPage;
