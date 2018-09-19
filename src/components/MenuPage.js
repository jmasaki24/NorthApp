import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Button } from './common';

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

export default MenuPage;
