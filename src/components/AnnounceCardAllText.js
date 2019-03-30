/**
 * Author: Matt Peters
 * could probably merge with AnnounceCardImage for byte savings...
 * purecomponent because it shallow compares the props so they don't have to re-render....
*/

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';

const renderBottomSection = (props) => {
  if (props.button) {
    return (
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
    );
  }
  return (
    <CardSection style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
      <Text style={{ fontSize: 14 }}>
        {props.time}
      </Text>
    </CardSection>
  );
};

class AnnounceCardAllText extends PureComponent {
  render() {
    return (
      <Card style={{ elevation: 5, marginHorizontal: 10 }}>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </CardSection>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <Text numberOfLines={10} style={styles.descripText}>{this.props.children}</Text>
        </CardSection>
        {renderBottomSection(this.props)}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  descripText: {
    fontSize: 18,
    flex: 1,
    color: 'black',
    margin: 5,
  },
});

export default AnnounceCardAllText;
