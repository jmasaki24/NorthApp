/**
* I was thinking this page could use a redesign with rectangle buttons,
* since there are 7 buttons it'd be a 2-3-2 or something that had more color
* colored rectangles with icons or backgroundimage?
*/
import React, { Component } from 'react';
import {
  Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Titan from '../images/titanT.png';
import { Card, CardSection, } from './common';
import {
  AcademicsPage, Admin, Athletics, BellSchedule, Clubs, ContactPage,
  PollLogin, PollPage, UsersAnnouncements, UsersEvents
} from './Menu';
import StoreStack from './Menu/StorePage';
import { UpcomingGames, IndivSportsPage, ScorePage, SchedulePage } from './AthleticsDetails';
import {
  CreateAnnounce, EditAnnounce, CreateEvent, EditEvent, DefaultImages, Photos
} from './AddStuff';
import i18n from '../utils/i18n';
import stadiumlights from '../images/fieldlights.jpg';
import chalkboard from '../images/chalkboard.jpg';

// TODO: make this a flatlist, or something to improve readability and maybe performance
class MenuPage extends Component {
  render() {
    const { imageStyle, textStyle, middleImage } = styles;
    return (
      <View style={styles.pageStyle}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
          <Card style={styles.topCards}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Clubs')}>
              <Text style={textStyle}>{i18n.t('CLUBS')}</Text>
            </TouchableOpacity>
          </Card>
          <Card style={styles.topCards}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Polls')}>
              <Text style={textStyle}>{i18n.t('VOTING')}</Text>
            </TouchableOpacity>
          </Card>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Academics')}
          style={styles.middleTouch}
        >
          <ImageBackground source={chalkboard} style={middleImage} imageStyle={imageStyle}>
              <Text style={[textStyle, { color: 'white' }]}>{i18n.t('ACADEMICS')}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Athletics')}
          style={styles.middleTouch}
        >
          <ImageBackground source={stadiumlights} style={middleImage} imageStyle={imageStyle}>
              <Text style={[textStyle, { color: 'white' }]}>{i18n.t('ATHLETICS')}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Store')}
          style={[styles.middleTouch, { backgroundColor: '#0D4877' }]}
        >
          <View style={middleImage}>
              <Text style={[textStyle, { color: 'white' }]}>{i18n.t('STORE')}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <CardSection style={styles.bottomCards}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')}>
              <Text style={textStyle}>{i18n.t('CONTACT')}</Text>
            </TouchableOpacity>
          </CardSection>
          <CardSection style={styles.bottomCards}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminHome')}>
              <Text style={textStyle}>{i18n.t('ADMINISTRATION')}</Text>
            </TouchableOpacity>
          </CardSection>
        </View>
        <Text style={{ alignSelf: 'center', margin: 5 }}>Copyright NHSN 2018</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomCards: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#0D4877',
    borderRadius: 10,

    shadowRadius: 10,
    shadowColor: '#edd',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  imageStyle: {
    resizeMode: 'cover',
    flex: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  middleImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  middleTouch: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'white',

    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  pageStyle: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  textStyle: {
    alignSelf: 'center',
    margin: 5,
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  topCards: {
    margin: 5,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

const MenuStack = createStackNavigator({
  Menu: MenuPage,
  Contact: ContactPage,
  Academics: AcademicsPage,
  Bells: BellSchedule,
  Clubs,
  Store: StoreStack,
  Athletics,
    UpcomingGames,
    IndivSportsPage,
      ScorePage,
      SchedulePage,
  AdminHome: Admin,
    CreateAnnounce,
      DefaultImages,
      Photos,
    CreateEvent,
    UsersAnnouncements,
    EditAnnounce,
    UsersEvents,
    EditEvent,
  Polls: PollLogin,
  PollPage
}, {
  headerLayoutPreset: 'center',
  headerMode: 'float',
  defaultNavigationOptions: ({ navigation }) => ({
    headerTitle:
      <TouchableHighlight onPress={() => navigation.dangerouslyGetParent().navigate('Home')}>
        <Image
          source={Titan}
          style={{ height: 40, width: 40 }}
        />
      </TouchableHighlight>,
    headerBackImage:
          <FontAwesome5 name={'arrow-left'} size={25} color={'black'} />,
    gesturesEnabled: true
  })
});

export default MenuStack;
