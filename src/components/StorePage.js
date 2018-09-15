import React, { Component } from 'react';
import { Image, Text, ScrollView } from 'react-native';
import { Card, CardSection } from './common';

class StorePage extends Component {
  render() {
    return (
      <ScrollView>
        <Card style={{ flexDirection: 'row', flex: 1 }}>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={{ height: 150, position: 'absolute' }}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302897_lifestyle?$rl_392_pdp$' }}
            />
          </CardSection>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={{ height: 150, position: 'absolute' }}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302885_lifestyle?$rl_392_pdp$' }}
            />
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  section: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    position: 'relative',
    backgroundColor: '#0dd'
  }
};

export default StorePage;
