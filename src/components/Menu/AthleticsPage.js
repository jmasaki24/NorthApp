import React, { PureComponent } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, Card, CardSection, } from '../common';
import SeasonSelect from '../AthleticsDetails/SeasonSelect';
import i18n from '../../utils/i18n.js';

class Athletics extends PureComponent {
  render() {
    console.log('render');
    const { buttonStyle, buttonTextStyle } = styles;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.titleText}>Athletics</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
          <Text>via </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://nashuanorthathletics.com')}
          >
            <Text style={{ textDecorationLine: 'underline', color: '#0000EE' }}>
              nashuanorthathletics.com
            </Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: 'white',
  },
  buttonTextStyle: {
    color: 'black',
  },
  titleText: {
    alignSelf: 'center',
    margin: 10,
    marginBottom: 5,
    fontSize: 30,
  }
});

export { Athletics };
