import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const ButtonImage = ({ onPress, uri, buttonText, picStyle, flexStyle }) => {
  const { buttonStyle, imageStyle, textStyle, viewStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View style={[viewStyle, flexStyle]}>
        <Image
          style={[imageStyle, picStyle]}
          source={{ uri }}
        />
        <Text style={textStyle}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    backgroundColor: '#F8F8F8',

    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F8F8F8',

    marginLeft: 5,
    marginRight: 5
  },
  imageStyle: {
    height: 30,
    width: 30
  },
  textStyle: {
    fontSize: 25
  },
  viewStyle: {
    flexDirection: 'row'
  }
};

export { ButtonImage };
