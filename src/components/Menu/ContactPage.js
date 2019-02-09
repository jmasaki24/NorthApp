/**
* Author: Jamie Maddock
* could honestly be a stateless component... maybe.
* doesn't get called until needed because of lazy react-navigation
* has no state or props...
*/

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { email } from 'react-native-communications';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const emailHandler = () => {
  email(['northcodingteam@gmail.com'], null, null, 'Nashua North Mobile App', 'Hello developers,');
};

class ContactPage extends PureComponent {
  render() {
    const { basicText, pageStyle } = styles;

    return (
      <View style={pageStyle}>
        <Text style={{ fontSize: 45, color: 'black' }}>  Contact Us </Text>
        <Text style={basicText}> Nashua High School North: </Text>
        <Text style={basicText}> 8 Titan Way, Nashua, NH; 03063 </Text>
        <Text style={basicText}> (603) 966-2500 </Text>
        <Text style={basicText}> Comments? Questions? </Text>
        <Text style={basicText}> Email us at northcodingteam@gmail.com </Text>
        <FontAwesome5.Button
          onPress={emailHandler}
          name={'envelope'}
        >
          Send Email
        </FontAwesome5.Button>
        <Text style={basicText}>Authors:</Text>
        <Text style={basicText}>Jamie Maddock and Matthew Peters</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  basicText: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
  },
  pageStyle: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export { ContactPage };
