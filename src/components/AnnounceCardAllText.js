/**
 * Author: Matt Peters
*/

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';

const AnnounceCardAllText = (props) => {
  if (props.button) {
    return (
      <Card>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.titleText}>{props.title}</Text>
        </CardSection>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <Text style={{ fontSize: 18, flex: 1, color: 'black' }}>{props.children}</Text>
        </CardSection>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: -1, flexDirection: 'row' }}>
            <Icon.Button
              name="edit" onPress={props.onEditPress}
              iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
            />
            <Icon.Button
              name="trash-alt" onPress={props.onDelPress}
              iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
            />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: -1 }}>
            <Text style={{ fontSize: 14 }}>
              {props.time}
            </Text>
          </View>
        </CardSection>
      </Card>
    );
  }
  return (
    <Card>
      <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.titleText}>{props.title}</Text>
      </CardSection>
      <CardSection style={{ borderBottomWidth: 0 }}>
        <Text style={{ fontSize: 18, flex: 1, color: 'black' }}>{props.children}</Text>
      </CardSection>
      <CardSection style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ fontSize: 14 }}>
          {props.time}
        </Text>
      </CardSection>
    </Card>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  }
});

export default AnnounceCardAllText;
