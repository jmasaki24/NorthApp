import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Titan from '../images/titanT.png';
import { CardSection, Button, } from './common';
import ContactPage from './ContactPage';
import AcademicsPage from './AcademicsPage';
import ClubsPage from './Clubs';
import BellSchedule from './Bells';
import StoreStack from './StorePage';
import AdminStack from './Admin';
import AthleticsPage from './AthleticsPage';
import AddContentPage from './AddStuff/AddContent';
import DefaultImagesPage from './AddStuff/DefaultImages';
import PhotosPage from './AddStuff/Photos';
import PhotosProtosPage from './AddStuff/PhotosProtoType';

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
        <Text style={{ alignSelf: 'center' }}>Copyright Nashua North 2018</Text>
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
  Admin: AdminStack,
  AddContent: AddContentPage,
  DefaultImages: DefaultImagesPage,
  Photos: PhotosPage,
  PhotosPT: PhotosProtosPage
}, {
  headerLayoutPreset: 'center',
  navigationOptions: ({ navigation }) => ({
    headerTitle:
      //<TouchableOpacity onPress={() => navigation.popToTop()}>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          source={Titan}
          style={{ height: 40, width: 40 }}
        />
      </TouchableOpacity>,
    headerBackImage: <FontAwesome5 name={'bars'} size={25} color={'black'} />
  })
});

export default MenuStack;
