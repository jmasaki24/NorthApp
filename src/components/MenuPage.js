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
import vote from '../images/checkbox.png';
import store from '../images/storebutton2.png';
import clubs from '../images/clubicons2.png';

class MenuPage extends Component {
  render() {
    const { imageStyle, textStyle, middleImage } = styles;
    return (
      <View style={styles.pageStyle}>
        <View style={{ flexDirection: 'row', flex: 2 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Clubs')}
            style={[styles.middleTouch, { borderRightWidth: 1 }]}
          >
            <ImageBackground source={clubs} style={middleImage} imageStyle={imageStyle}>
              <Text style={textStyle}>{i18n.t('CLUBS')}</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Polls')}
            style={[styles.middleTouch, { borderLeftWidth: 1 }]}
          >
            <ImageBackground source={vote} style={middleImage} imageStyle={imageStyle}>
              <Text style={textStyle}>{i18n.t('VOTING')}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Academics')}
          style={[styles.middleTouch, { borderTopWidth: 2 }]}
        >
          <ImageBackground source={chalkboard} style={middleImage} imageStyle={imageStyle}>
              <Text style={[textStyle, { color: 'white' }]}>{i18n.t('ACADEMICS')}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Store')}
        style={[styles.middleTouch, { borderTopWidth: 2 }]}
        >
        <ImageBackground source={store} style={middleImage} imageStyle={imageStyle} >
        <Text style={[textStyle]}>{i18n.t('STORE')}</Text>
        </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Athletics')}
          style={[styles.middleTouch, { borderTopWidth: 2 }]}
        >
          <ImageBackground source={stadiumlights} style={middleImage} imageStyle={imageStyle}>
              <Text style={[textStyle, { color: 'white' }]}>{i18n.t('ATHLETICS')}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Contact')}
              style={[styles.bottomCards, { borderRightWidth: 1 }]}
            >
              <Text style={textStyle}>{i18n.t('CONTACT')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AdminHome')}
              style={[styles.bottomCards, { borderLeftWidth: 1 }]}
            >
              <Text style={textStyle}>{i18n.t('ADMINISTRATION')}</Text>
            </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: 'center', margin: 5 }}>Copyright NHSN 2018</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomCards: {
    // marginHorizontal: 10,
    // marginVertical: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,

    // borderRadius: 10,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: '#CCC',

    shadowRadius: 10,
    shadowColor: '#edd',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.5,
    // elevation: 5,
  },
  imageStyle: {
    resizeMode: 'cover',
    flex: 1,
    borderColor: '#CCC',
    // borderRadius: 10,
  },
  middleImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  middleTouch: {
    flex: 2,
    // borderRadius: 10,
    // margin: 10,
    backgroundColor: 'white',

    // elevation: 10,
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
    fontSize: 24,
    fontWeight: '600',
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image
            source={Titan}
            style={{ height: 40, width: 40 }}
          />
          <Text style={{ flex: 1, fontSize: 18 }}>itan Menu</Text>
        </View>
      </TouchableHighlight>,
    headerBackImage:
          <FontAwesome5 name={'arrow-left'} size={25} color={'black'} />,
    gesturesEnabled: true
  })
});

export default MenuStack;
