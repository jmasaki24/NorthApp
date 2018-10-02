import React from 'react';
import { Text, Image, View } from 'react-native';
import { Card, CardSection } from './common';

// title, uri, children, tags ; are props
const AnnounceCardImage = (props) => {
  console.log(props.image);
  return (
    <Card>
      <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.titleText}>
          {props.title}
        </Text>
      </CardSection>
      <CardSection style={{ alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
            source={props.image}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, color: 'black' }}>{props.children}</Text>
        </View>
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
