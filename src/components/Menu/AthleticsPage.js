import React, { PureComponent } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => Linking.openURL('https://www.nashuanorthathletics.com/siteRepository/21551/userfiles/North-Coaches-2018-192.pdf')}
            >
              <Text style={buttonTextStyle}>{i18n.t('COACHES_DIRECTORY')}</Text>
              <Icon name='link' />
            </TouchableOpacity>
          </CardSection>
          <CardSection>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => Linking.openURL('https://www.nashuanorthathletics.com/main/otherad/contentID/41289580')}
            >
              <Text style={buttonTextStyle}>{i18n.t('POLICIES')}</Text>
              <Icon name='link' />
            </TouchableOpacity>
          </CardSection>
          <CardSection>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => Linking.openURL('https://www.familyid.com/programs/high-school-north-winter-2018-19')}
            >
              <Text style={buttonTextStyle}>{i18n.t('REGISTRATION')}</Text>
              <Icon name='link' />
            </TouchableOpacity>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: 'white',
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonTextStyle: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  titleText: {
    alignSelf: 'center',
    margin: 10,
    marginBottom: 5,
    fontSize: 30,
  }
});

export { Athletics };
