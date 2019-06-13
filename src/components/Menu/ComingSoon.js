import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ComingSoon = () => (
  <ScrollView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Here are some features we hope to add within the 2019-2020 school year</Text>
      <Text style={styles.bulletText}>{'\t\u2022 '}E-block Scheduler/Request System</Text>
      <Text style={styles.bulletText}>{'\t\u2022 '}Alert/Emergency System</Text>
      <Text style={styles.bulletText}>{'\t\u2022 '}Electronic Hall Pass</Text>
      <Text style={{ fontSize: 20 }}>Smaller fixes are listed below</Text>
      <Text style={styles.bulletText}>{'\t\u2022 '}Pinch to zoom on images in the Home and Search pages</Text>
      <Text style={styles.bulletText}>{'\t\u2022 '}Update UI in the Academics page</Text>
      <Text style={styles.bulletText}>{'\t\u2022 '}Fix design in the Athletics pages</Text>
      <Text style={styles.bulletText}>{'\t\u2022 '}List parts of the app in the Search page</Text>
      <View style={{ height: 20 }} />
      <Text style={styles.bulletText}>If you want to help out, please contact us!</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  bulletText: {
    fontSize: 18,
  },
});

export default ComingSoon;
