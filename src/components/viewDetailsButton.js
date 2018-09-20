import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

class ViewDetailsButton extends Component {
  render() {
    return (
      <View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => this.props.navigation.navigate('Store')}
      >
        <Text style={styles.buttonText}>
          View Details
        </Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    flex: 0,
    borderRadius: 0,
    backgroundColor: null,
    margin: 0,
    alignItems: 'center'
  },
  buttonText: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 12,
    padding: 0,
  }
};

export default withNavigation(ViewDetailsButton);
