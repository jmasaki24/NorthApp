/**
* @param Obj inputStyle  for native textput
* @param obj labelStyle for the <text> initially in the input
* @param obj containerStyle
*/

import React from 'react';
import { StyleSheet, Text, TextInput, } from 'react-native';
import { CardSection } from '../common';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  autocorrect,
  keyboardType,
  onChange
}) => {
  const { inputStyle, labelStyle } = styles;
  if (label !== '') {
    return (
      // <View style={[containerStyle, viewStyle]}>
      //   <Text style={labelStyle}>{label}</Text>
      //   <TextInput
      //     secureTextEntry={secureTextEntry}
      //     placeholder={placeholder}
      //     autocorret={autocorrect || true}
      //     style={inputStyle}
      //     value={value}
      //     onChangeText={onChangeText}
      //     multiline={multiline || false}
      //     keyboardType={keyboardType || 'default'}
      //     underlineColorAndroid={'white'}
      //     onChange={onChange}
      //   />
      // </View>
      <CardSection style={{ alignItems: 'center' }}>
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
          onChange={onChange}
        />
      </CardSection>
    );
  }
  return (
    // <View style={[containerStyle, viewStyle]}>
    //   <TextInput
    //     secureTextEntry={secureTextEntry}
    //     placeholder={placeholder}
    //     autocorret={autocorrect || true}
    //     style={inputStyle}
    //     value={value}
    //     onChangeText={onChangeText}
    //     multiline={multiline || false}
    //     keyboardType={keyboardType || 'default'}
    //     underlineColorAndroid={'white'}
    //     onChange={onChange}
    //   />
    // </View>
    <CardSection>
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
        onChange={onChange}
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
