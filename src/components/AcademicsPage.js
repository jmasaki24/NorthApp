/**
* Author: Matt Peters
*/

import React, { Component } from 'react';
import { Linking, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';
import i18n from '../utils/i18n';

class AcademicsPage extends Component {
  render() {
    const { buttonStyle, textStyle } = styles;
    return (
      <Card>
        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => Linking.openURL('https://x2.nashua.edu/aspen/logon.do')}
          >
            <Text style={textStyle}>X2 Aspen</Text>
            <Icon name='link' />
          </TouchableOpacity>
        </CardSection>
        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => Linking.openURL('http://www.nashua.edu/contact-us/staff-directory.aspx')}
          >
            <Text style={textStyle}>{i18n.t('STAFF_DIRECTORY')}</Text>
            <Icon name='link' />
          </TouchableOpacity>
        </CardSection>
        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => this.props.navigation.navigate('Bells')}
          >
            <Text style={textStyle}>{i18n.t('BELL_SCHEDULE')}</Text>
          </TouchableOpacity>
        </CardSection>
        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => Linking.openURL('http://www.nashua.edu/Nashua/Media/PDF-files/For%20Students/Nashua-North-2018-2019-Agenda-Book.pdf')}
          >
            <Text style={textStyle}>{i18n.t('STUDENT_HANDBOOK')}</Text>
            <Icon name='link' />
          </TouchableOpacity>
        </CardSection>
        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => Linking.openURL('http://www.nashua.edu/getmedia/02fd65e0-fd7a-45d0-ba05-e996d016c390/2017-POS_MSTR_012916_WEB_1A')}
          >
            <Text style={textStyle}>{i18n.t('PROGRAM_OF_STUDIES')}</Text>
            <Icon name='link' />
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',

    borderRadius: 5,
    borderWidth: 1,

    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    paddingBottom: 10
  },
  textStyle: {
    color: '#000',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  }
};

export default AcademicsPage;
