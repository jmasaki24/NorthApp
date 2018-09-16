import React, { Component } from 'react';
import { Image, Text, ScrollView, View } from 'react-native';
import { CardSection } from './common';

//next is converting this to a flatlist or sectionlist

class StorePage extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 0 }}>
        <View style={styles.row}>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302897_lifestyle?$rl_392_pdp$' }}
            />
            <Text style={styles.text}> PatchWork Rugby Hoodie $248 </Text>
          </CardSection>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302885_lifestyle?$rl_392_pdp$' }}
            />
            <Text style={styles.text}> Classic Fit Cotton Rugby Shirt $168 </Text>
          </CardSection>
        </View>
        <View style={styles.row}>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302871_lifestyle?$rl_392_pdp$' }}
            />
            <Text style={styles.text}> Cotton Blend Fleece Sweatshirt $188 </Text>
          </CardSection>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302888_lifestyle?$rl_392_pdp$' }}
            />
            <Text style={styles.text}> Cotton Blend Fleece Cardigan $248 </Text>
          </CardSection>
        </View>
        <View style={styles.row}>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302897_lifestyle?$rl_392_pdp$' }}
            />
            <Text style={styles.text}> PatchWork Rugby Hoodie $248 </Text>
          </CardSection>
          <CardSection style={styles.section}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: 'https://www.rlmedia.io/is/image/PoloGSI/s7-1302885_lifestyle?$rl_392_pdp$' }}
            />
            <Text style={styles.text}> Classic Fit Cotton Rugby Shirt $168 </Text>
          </CardSection>
        </View>
      </ScrollView>
    );
  }
}


const styles = {
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  row: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  section: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#0dd',
    padding: 0,
    margin: 2.5,
  },
  image: {
    flex: 1,
  }
};

export default StorePage;
