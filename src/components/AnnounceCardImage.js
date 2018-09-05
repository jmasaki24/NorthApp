import React from 'react';
import { Text, Image, View } from 'react-native';
import { Card, CardSection } from './common';

const AnnounceCardImage = ({ title, uri, children }) => (
    <Card>
      <CardSection style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', }}>
          {title}
        </Text>
      </CardSection>
      <CardSection>
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 140, height: 140, alignSelf: 'center' }}
            source={{ uri }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18 }}>{ children }</Text>
        </View>
      </CardSection>
    </Card>
  );

  export default AnnounceCardImage;
