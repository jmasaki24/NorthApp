import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Titan from '../images/titanT.png';
import { CardSection, Button } from './common';
import ContactPage from './ContactPage';
import AcademicsPage from './AcademicsPage';
import ClubsPage from './Clubs';
import BellSchedule from './Bells';
import StoreStack from './StorePage';
import AdminPage from './Admin';

class MenuPage extends Component {
  render() {
    const { buttonStyle, textStyle, pageStyle } = styles;
    return (
        <View style={pageStyle}>
          <CardSection style={{ padding: 0 }}>
            <Button
              buttonStyle={buttonStyle}
              textStyle={textStyle}
            >
              Athletics
            </Button>
          </CardSection>
          <CardSection style={{ padding: 0 }}>
            <Button
              buttonStyle={buttonStyle}
              textStyle={textStyle}
              onPress={() => this.props.navigation.navigate('Academics')}
            >
              Academics
            </Button>
          </CardSection>
          <CardSection style={{ padding: 0 }}>
            <Button
              buttonStyle={buttonStyle}
              textStyle={textStyle}
              onPress={() => this.props.navigation.navigate('Store')}
            >
              Store
            </Button>
          </CardSection>
          <CardSection style={{ padding: 0 }}>
            <Button
              buttonStyle={buttonStyle}
              textStyle={textStyle}
              onPress={() => this.props.navigation.navigate('Clubs')}
            >
              Clubs
            </Button>
          </CardSection>
          <CardSection style={{ padding: 0 }}>
            <Button
              buttonStyle={buttonStyle}
              textStyle={textStyle}
              onPress={() => this.props.navigation.navigate('Contact')}
            >
              Contact Us
            </Button>
          </CardSection>
          <CardSection style={{ padding: 0 }}>
            <Button
              buttonStyle={buttonStyle}
              textStyle={textStyle}
              onPress={() => this.props.navigation.navigate('Admin')}
            >
              Admin
            </Button>
          </CardSection>
        </View>
    );
  }
}

const styles = {
  pageStyle: {
    backgroundColor: '#FEFEFC'
  },
  buttonStyle: {
    //borderColor: 'white',
    borderWidth: null,
    backgroundColor: '#AEC6EA',
    borderRadius: 0,
    paddingLeft: 10,
    margin: 0
  },
  textStyle: {
    color: '#0C4678',
    alignSelf: 'flex-start'
  }
};

const MenuStack = createStackNavigator({
  Menu: MenuPage,
  Contact: ContactPage,
  Academics: AcademicsPage,
  Clubs: ClubsPage,
  Bells: BellSchedule,
  Store: StoreStack,
  Admin: AdminPage
}, {
  navigationOptions: {
    headerTitle:
      <Image
        source={Titan}
        style={{ height: 40, width: 40 }}
      />
  }
});

export default MenuStack;
