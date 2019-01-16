import React from 'react';
import { Modal, StyleSheet, Text, View, } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { cardSectionStyle, textStyle, containerStyle, buttonStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      //animationType="slide"
      onRequestClose={() => console.log('Close Confirm')}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>

        <CardSection>
          <Button onPress={onAccept} buttonStyle={buttonStyle}>Yes</Button>
          <Button onPress={onDecline} buttonStyle={buttonStyle}>No</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
  }
});

export { Confirm };
