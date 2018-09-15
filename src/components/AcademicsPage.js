import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Card, Button, CardSection } from './common';

class AcademicsPage extends Component {
  render() {
    const { buttonStyle, textStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => Linking.openURL('https://x2.nashua.edu/aspen/logon.do')}
          >
            X2 Aspen
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => Linking.openURL('http://www.nashua.edu/contact-us/staff-directory.aspx')}
          >
            Staff Directory
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => this.props.navigation.navigate('Bells')}
          >
            Bell Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => Linking.openURL('http://www.nashua.edu/Nashua/Media/PDF-files/For%20Students/Nashua-North-2018-2019-Agenda-Book.pdf')}
          >
            Student Handbook
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            onPress={() => Linking.openURL('http://www.nashua.edu/getmedia/02fd65e0-fd7a-45d0-ba05-e996d016c390/2017-POS_MSTR_012916_WEB_1A')}
          >
            Program of Studies
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  textStyle: {
    color: '#000'
  }
};

export default AcademicsPage;
