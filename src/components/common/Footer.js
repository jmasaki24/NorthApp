import React from 'react';
import { Text, View } from 'react-native';
import { ButtonImage } from './ButtonImage';

const Footer = (props) => {
  const { viewStyle } = styles;

  return (
    <View style={viewStyle}>{props.children}</View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    elevation: 2,
    postition: 'relative'
  }
};

export { Footer };
