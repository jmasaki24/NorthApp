import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const ButtonImage = ({ onPress, uri, buttonText, style }) =>
{
  const { buttonStyle, imageStyle, textStyle, viewStyle } = styles;

  return(
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View style={viewStyle}>
        <Image
          style={[imageStyle, style]}
          source={{ uri: uri }}
        />
        <Text>        </Text>
        <Text style={textStyle}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    backgroundColor: 'white',

    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffff',

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
