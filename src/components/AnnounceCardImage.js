import React from 'react';
import { Text, Image, View } from 'react-native';
import { Card, CardSection } from './common';
// title, uri, children, tags ; are props
const AnnounceCardImage = (props) => (
    <Card>
      <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', }}>
          {props.title}
        </Text>
      </CardSection>
      <CardSection>
        <Text> {props.tags} </Text>
      </CardSection>
      <CardSection style={{ alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 140, height: 140, alignSelf: 'center' }}
            source={{ uri: props.uri }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18 }}>{ props.children }</Text>
        </View>
      </CardSection>
    </Card>
  );

  export default AnnounceCardImage;
