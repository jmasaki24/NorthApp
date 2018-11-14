/**
* Author: Matt Peters
*/

import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';

// title, uri, children, tags ; are props
const AnnounceCardImage = (props) => {
  if (props.button) {
    return (
      <Card>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.titleText}>
            {props.title}
          </Text>
          <View style={{ flex: -1 }}>
            <Icon.Button name="trash-alt" onPress={props.onPress} />
          </View>
        </CardSection>
        <CardSection style={{ alignItems: 'center', borderBottomWidth: 0 }}>
          <View style={{ flex: 1 }}>
            {props.children}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: 'black' }}>{props.info}</Text>
          </View>
        </CardSection>
        <CardSection style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ fontSize: 14 }}>
            {props.time}
          </Text>
        </CardSection>
      </Card>
    );
  }
  return (
    <Card>
      <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.titleText}>
          {props.title}
        </Text>
      </CardSection>
      <CardSection style={{ alignItems: 'center', borderBottomWidth: 0 }}>
        <View style={{ flex: 1 }}>
          {props.children}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, color: 'black' }}>{props.info}</Text>
        </View>
      </CardSection>
      <CardSection style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ fontSize: 14 }}>
          {props.time}
        </Text>
      </CardSection>
    </Card>
  );
};

  const styles = {
    titleText: {
      color: '#000',
      fontSize: 25,
      fontWeight: 'bold'
    }
  };

  export default AnnounceCardImage;

  // <Image
  //   style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
  //   source={props.image}
  // />
