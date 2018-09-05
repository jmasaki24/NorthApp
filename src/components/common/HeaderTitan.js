import React, { Component } from 'react';
import { View, Image } from 'react-native';

class HeaderTitan extends Component {
  render() {
    const { viewStyle, imageStyle } = styles;
    return (
      <View style={viewStyle}>
        <Image
          style={imageStyle}
          source={{ uri: "https://schoolassets.s3.amazonaws.com/logos/21551/21551.png" }}
        />
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    postition: 'relative'
  },
  imageStyle: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { HeaderTitan };
