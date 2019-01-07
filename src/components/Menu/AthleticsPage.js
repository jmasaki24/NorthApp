import React, { Component } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Card, CardSection, Button } from '../common';
import SeasonSelect from '../AthleticsDetails/SeasonSelect';
import i18n from '../../utils/i18n.js';

class Athletics extends Component {
  renderItem() {
    return <CardSection style={{ width: 75, height: 50, borderRightWidth: 3 }} />;
  }

  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Card style={{ marginBottom: 20 }}>
          <CardSection>
            <Button
              buttonStyle={buttonStyle}
              textStyle={buttonTextStyle}
              onPress={() => this.props.navigation.navigate('UpcomingGames')}
            >
              {i18n.t('UPCOMING_GAMES')}
            </Button>
          </CardSection>
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
              {i18n.t('COACHES_DIRECTORY')}
            </Button>
          </CardSection>
          <CardSection>
            <Button
              buttonStyle={buttonStyle}
              textStyle={buttonTextStyle}
              onPress={() => Linking.openURL('https://www.nashuanorthathletics.com/main/otherad/contentID/41289580')}
            >
              {i18n.t('POLICIES')}
            </Button>
          </CardSection>
          <CardSection>
            <Button
              buttonStyle={buttonStyle}
              textStyle={buttonTextStyle}
              onPress={() => Linking.openURL('https://www.familyid.com/programs/high-school-north-winter-2018-19')}
            >
              {i18n.t('REGISTRATION')}
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

export { Athletics };
