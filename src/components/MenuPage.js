import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Titan from '../images/titanT.png';
import { CardSection, Button, } from './common';
import ContactPage from './Menu/ContactPage';
import AcademicsPage from './Menu/AcademicsPage';
import ClubsPage from './Menu/Clubs';
import BellSchedule from './Menu/Bells';
import StoreStack from './Menu/StorePage';
import AdminStack from './Menu/Admin';
import AthleticsPage from './Menu/AthleticsPage';
import UpcomingGamesPage from './AthleticsDetails/UpcomingGamesPage';
import IndivSportsPage from './AthleticsDetails/IndivSportsPage';
import ScorePage from './AthleticsDetails/ScorePage';
import SchedulePage from './AthleticsDetails/SchedulePage';
import PollLogin from './Menu/PollLogin';
import PollPage from './Menu/PollPage';
import i18n from '../utils/i18n';

//want to make this a flatlist afterwards? not sure if it will improve performance

class MenuPage extends Component {
  render() {
    const { buttonStyle, textStyle, pageStyle } = styles;
    return (
      <View style={pageStyle}>
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
            onPress={() => this.props.navigation.navigate('Academics')}
          >
            {i18n.t('ACADEMICS')}
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
            onPress={() => this.props.navigation.navigate('Clubs')}
          >
            {i18n.t('CLUBS')}
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
            onPress={() => this.props.navigation.navigate('Admin')}
          >
            {i18n.t('ADMINISTRATION')}
          </Button>
        </CardSection>
        <Text style={{ alignSelf: 'center' }}>Copyright NHSN 2018</Text>
      </View>
    );
  }
}

const styles = {
  pageStyle: {
    backgroundColor: '#FEFEFC',
    flex: 1
  },
  buttonStyle: {
    //borderColor: 'white',
    borderWidth: null,
    backgroundColor: 'white',
    borderRadius: 0,
    paddingLeft: 10,
    margin: 0
  },
  textStyle: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 18,
    margin: 5
  }
};

const MenuStack = createStackNavigator({
  Menu: MenuPage,
  Contact: ContactPage,
  Academics: AcademicsPage,
  Bells: BellSchedule,
  Clubs: ClubsPage,
  Store: StoreStack,
  Athletics: AthleticsPage,
    UpcomingGames: UpcomingGamesPage,
    IndivSportsPage,
      ScorePage,
      SchedulePage,
  Admin: AdminStack,
  Polls: PollLogin,
  PollPage
}, {
  headerLayoutPreset: 'center',
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
