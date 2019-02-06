/**
* I was thinking this page could use a redesign with rectangle buttons,
* since there are 7 buttons it'd be a 2-3-2 or something that had more color
* colored rectangles with icons or backgroundimage?
*/
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Titan from '../images/titanT.png';
import { CardSection, Button, } from './common';
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

// TODO: make this a flatlist, or something to improve readability and maybe performance
class MenuPage extends Component {
  render() {
    const { buttonStyle, textStyle, pageStyle } = styles;
    return (
      <View style={pageStyle}>
        <CardSection style={{ padding: 0 }}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('Academics')}
          >
            {i18n.t('ACADEMICS')}
          </Button>
        </CardSection>
        <CardSection style={{ padding: 0 }}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('AdminHome')}
          >
            {i18n.t('ADMINISTRATION')}
          </Button>
        </CardSection>
        <CardSection style={{ padding: 0 }}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('Athletics')}
          >
            {i18n.t('ATHLETICS')}
          </Button>
        </CardSection>
        <CardSection style={{ padding: 0 }}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('Clubs')}
          >
            {i18n.t('CLUBS')}
          </Button>
        </CardSection>
        <CardSection style={{ padding: 0 }}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('Contact')}
          >
            {i18n.t('CONTACT')}
          </Button>
        </CardSection>
        <CardSection style={{ padding: 0 }}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('Store')}
          >
            {i18n.t('STORE')}
          </Button>
        </CardSection>
        <CardSection style={{ padding: 0 }}>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('Polls')}
          >
            {i18n.t('VOTING')}
          </Button>
        </CardSection>
        <Text style={{ alignSelf: 'center' }}>Copyright NHSN 2018</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    backgroundColor: '#FEFEFC',
    flex: 1,
  },
  buttonStyle: {
    //borderColor: 'white',
    borderWidth: null,
    backgroundColor: 'white',
    borderRadius: 0,
    paddingLeft: 10,
    margin: 0,
  },
  textStyle: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 18,
    margin: 5,
  }
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
