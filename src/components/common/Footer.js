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

/*
  <Footer style={{ justifyContent: 'space-around' }}>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ButtonImage
        uri="https://vignette.wikia.nocookie.net/lieblingsbuecher/images/3/3d/Haus_-_Vector-Icon.png/revision/latest?cb=20140129173224&path-prefix=de"
        picStyle={{ height: 40, width: 40 }}
      />
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ButtonImage
        uri="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
        picStyle={{ height: 40, width: 40 }}
      />
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ButtonImage
        uri="https://www.freeiconspng.com/uploads/calendar-icon-png--0.png"
        picStyle={{ height: 40, width: 40 }}
      />
    </View>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ButtonImage
        uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZTn_1Y9Kt_iH7GNxjMmKVq0aAnmbPXNodZ_gEyjX4zYXBWVE"
        picStyle={{ height: 40, width: 40 }}
      />
    </View>
  </Footer>
*/
