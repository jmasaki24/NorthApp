import React from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';

const AnnounceCardAllText = (props) => (
    <Card>
      <CardSection style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{props.title}</Text>
      </CardSection>
      <CardSection>
        <Text> {props.tags} </Text>
      </CardSection>
      <CardSection>
        <Text style={{ fontSize: 18, flex: 1 }}>{props.children}</Text>
      </CardSection>
    </Card>
  );

export default AnnounceCardAllText;
