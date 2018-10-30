import React from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';

const AnnounceCardAllText = (props) => (
    <Card>
      <CardSection style={{ justifyContent: 'center' }}>
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

const styles = {
  titleText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold' }
};

export default AnnounceCardAllText;
