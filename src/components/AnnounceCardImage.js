import React from 'react';
import { Text, Image, View } from 'react-native';
import { Card, CardSection } from './common';

// title, uri, children, tags ; are props
const AnnounceCardImage = (props) => {
  return (
    <Card>
      <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.titleText}>
          {props.title}
        </Text>
      </CardSection>
      <CardSection style={{ alignItems: 'center', borderBottomWidth: 0 }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
            source={props.image}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: 'black' }}>{props.children}</Text>
        </View>
      </CardSection>
      <CardSection style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ fontSize: 10 }}>
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
      fontWeight: 'bold' }
  };

  export default AnnounceCardImage;
