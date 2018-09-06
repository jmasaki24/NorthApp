import React from 'react';
import { View } from 'react-native';

const Footer = (props) => {
  const { viewStyle } = styles;

  return (
    <View style={[viewStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    elevation: 2
  }
};

export { Footer };
