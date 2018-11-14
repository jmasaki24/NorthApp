/**
* @param Obj inputStyle  for native textput
*@param obj labelStyle for the <text> initially in the input
* @param obj containerStyle
*/

import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  autocorrect,
  keyboardType,
  viewStyle
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  if (label !== '') {
    return (
      <View style={[containerStyle, viewStyle]}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autocorret={autocorrect || true}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline || false}
          keyboardType={keyboardType || 'default'}
          underlineColorAndroid={'white'}
        />
      </View>
    );
  }
  return (
    <View style={[containerStyle, viewStyle]}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autocorret={autocorrect || true}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline || false}
        keyboardType={keyboardType || 'default'}
        underlineColorAndroid={'white'}
      />
    </View>
  );
};

const styles = {
    inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 18,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
