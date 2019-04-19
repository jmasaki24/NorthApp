/**
* @param Obj inputStyle  for native textput
* @param obj labelStyle for the <text> initially in the input
* @param obj containerStyle
*/

import React from 'react';
import { StyleSheet, Text, TextInput, } from 'react-native';
import { CardSection } from '../common';

const Input = ({
  autocorrect,
  inputFlexNum,
  keyboardType,
  label,
  onChange, // do we actually use this??? -JMmarch29
  onChangeText,
  multiline,
  placeholder,
  returnKeyType,
  secureTextEntry,
  value,
}) => {
  const { inputStyle, labelStyle } = styles;
  let inputFlex = 2;
  if (inputFlexNum >= 1) {
    inputFlex = inputFlexNum;
  }
  if (label !== '') {
    return (
      <CardSection style={{ alignItems: 'center' }}>
      <Text numberOfLines={1} style={labelStyle}>{label}</Text>
        <TextInput
          autocorrect={autocorrect || true}
          blurOnSubmit
          keyboardType={keyboardType || 'default'}
          onChange={onChange}
          onChangeText={onChangeText}
          multiline={multiline || false}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          style={[inputStyle, { flex: inputFlex }]}
          underlineColorAndroid={'white'}
          value={value}
        />
      </CardSection>
    );
  }
  return (
    <CardSection>
      <TextInput
        autocorrect={autocorrect || true}
        keyboardType={keyboardType || 'default'}
        multiline={multiline || false}
        onChange={onChange}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={inputStyle}
        underlineColorAndroid={'white'}
        value={value}
      />
    </CardSection>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 16,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 20,
    flex: 1,
  }
});

export { Input };
