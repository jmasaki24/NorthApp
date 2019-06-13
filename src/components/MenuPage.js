/**
* WARNING: THIS FILE EXPORT 'MenuStack'
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
import StorePage from './Menu/StorePage';
import StoreItem from './Menu/StoreItem';
import { UpcomingGames, IndivSportsPage, ScorePage, SchedulePage } from './AthleticsDetails';
import {
   AnnounceForm, EventForm, CreateEvent, EditEvent, DefaultImages,
} from './AddStuff';
import i18n from '../utils/i18n';
import stadiumlights from '../images/fieldlights.jpg';
import chalkboard from '../images/chalkboard.jpg';
import vote from '../images/checkbox.png';
import store from '../images/storebutton.png';
import clubs from '../images/clubicons.png';
import Icon from '../images/icon';

class MenuPage extends Component {
  render() {
    const { imageStyle, textStyle, middleImage, icon, middleTouch, bottomCards } = styles;
    return (
      <View style={styles.pageStyle}>
        <View style={{ flexDirection: 'row', flex: 2 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Clubs')}
            style={[styles.middleTouch, { borderRightWidth: 0 }]}
          >
            <ImageBackground source={clubs} style={middleImage} imageStyle={imageStyle}>
              <Text style={textStyle}>{i18n.t('CLUBS')}</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Polls')} style={[middleTouch, { borderLeftWidth: 0 }]}>
            <ImageBackground source={vote} style={middleImage} imageStyle={imageStyle}>
              <Text style={textStyle}>{i18n.t('VOTING')}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Academics')} style={[middleTouch, { borderTopWidth: 0 }]}>
          <ImageBackground source={chalkboard} style={middleImage} imageStyle={imageStyle} >
            <Icon src={'menu-academics'} size={50} style={icon} color={'#F7F7F7'} />
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Store')} style={[middleTouch, { borderTopWidth: 0 }]}>
          <ImageBackground source={store} style={middleImage} imageStyle={imageStyle} >
            <Text style={[textStyle]}>{i18n.t('STORE')}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Athletics')} style={[middleTouch, { borderTopWidth: 0 }]}>
          <ImageBackground source={stadiumlights} style={middleImage} imageStyle={imageStyle}>
            <Icon src={'menu-athletics'} size={50} style={icon} color={'#F7F7F7'} />
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')} style={[bottomCards, { borderRightWidth: 1 }]}>
            <Text adjustFontSizeToFit style={textStyle}>{i18n.t('CONTACT')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminHome')} style={[bottomCards, { borderLeftWidth: 1 }]}>
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
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,

    borderRadius: 10,
    // borderTopWidth: 2,
    borderWidth: 1,
    borderColor: '#CCC',

    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    // elevation: 1,
  },
  icon: {
    alignSelf: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
    flex: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    opacity: 0.4,
  },
  middleImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  middleTouch: {
    flex: 2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#555',

    elevation: 5,
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
    fontSize: 22,
    fontWeight: '600',
  },
});
// this probably isn't clean code... sorry
const MenuStack = createStackNavigator({
  Menu: MenuPage,
  Contact: ContactPage,
  Academics: AcademicsPage,
  Bells: BellSchedule,
  Clubs,
  Store: {
    screen: StorePage,
    navigationOptions: () => ({
      headerTitle: <Text style={{ fontSize: 18, alignSelf: 'center', }}>Gediyon Merch Store</Text>,
    }),
  },
  Item: {
    screen: StoreItem,
    navigation: () => ({
      headerTitle: <Text style={{ fontSize: 18, alignSelf: 'center', }}>Gediyon Merch Store</Text>,
      headerBackImage:
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesome5 style={{ marginRight: 3 }} name={'caret-left'} color={'black'} size={33} />
          <FontAwesome5 name={'store-alt'} color={'black'} size={20} />
        </View>,
    }),
  },
  Athletics,
    UpcomingGames,
    IndivSportsPage,
      ScorePage,
      SchedulePage,
  AdminHome: {
    screen: Admin,
    navigationOptions: () => ({
      headerTitle: <Text style={{ fontSize: 30, }}>Admin</Text>
    }),
  },
      AnnounceForm: {
        screen: AnnounceForm,
        navigationOptions: () => ({
          headerTitle: <Text style={{ fontSize: 20 }}>Create/Edit an Announcement</Text>
        }),
      },
      EventForm: {
        screen: EventForm,
        navigationOptions: () => ({
          headerTitle: <Text style={{ fontSize: 20 }}>Create/Edit an Event</Text>
        }),
      },
      DefaultImages: {
        screen: DefaultImages,
        navigationOptions: () => ({
          headerTitle: <Text style={{ fontSize: 20 }}>Select an Image</Text>
        }),
      },
    CreateEvent: {
      screen: CreateEvent,
      navigationOptions: () => ({
        headerTitle: <Text style={{ fontSize: 20 }}>Create an Event</Text>
      }),
    },
    UsersAnnouncements: {
      screen: UsersAnnouncements,
      navigationOptions: () => ({
        headerTitle: <Text style={{ fontSize: 20 }}>Your Announcements</Text>
      }),
    },
    UsersEvents: {
      screen: UsersEvents,
      navigationOptions: () => ({
        headerTitle: <Text style={{ fontSize: 20 }}>Your Events</Text>
      }),
    },
    EditEvent: {
      screen: EditEvent,
      navigationOptions: () => ({
        headerTitle: <Text style={{ fontSize: 20 }}>Edit Your Event</Text>
      }),
    },
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
    headerBackTitle: null, // for iOS
    headerBackImage:
          <FontAwesome5 style={{ marginLeft: 5 }} name={'arrow-left'} size={25} color={'black'} />,
    gesturesEnabled: true
  })
});

export default MenuStack;
