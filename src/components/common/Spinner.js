import React from 'react';
import { ActivityIndicator, StyleSheet, View, } from 'react-native';

const Spinner = (props) => (
    <View style={styles.spinnerStyle || props.style}>
      <ActivityIndicator size={props.size || 'large'} />
    </View>
  );

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export { Spinner };
