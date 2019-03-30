/**
* Date: 10/29/18
* Author: Matt Peters
*/
import React, { Component } from 'react';
import { Platform, StyleSheet, View, } from 'react-native';
import { connect } from 'react-redux';
import CameraRollPicker from 'react-native-camera-roll-multi-picker';
import Permissions from 'react-native-permissions';
import { Button, CardSection, Spinner, } from '../common';
import { addImage, isDefaultImage } from '../../actions';

class DevicePhotos extends Component {
  state = { photoPermission: '' };

  componentWillMount() {
    Permissions.check('photo').then(response => {
      this.setState({ photoPermission: response });
    });
  }

  onImagePress(image) {
    //console.log(image);
    let URI = Object.values(image[0])[5];
    if (Platform.OS === 'android') {
      URI = image[0].uri;
      // console.log(`URI 4 android: ${URI}`);
    }
    //console.log(URI);
    this.props.isDefaultImage(false);
    this.props.addImage(URI);
    this.props.navigation.navigate('CreateAnnounce');
  }

  onCancelPress() {
    this.props.isDefaultImage(null);
    this.props.addImage('');
    this.props.navigation.navigate('DefaultImages');
  }

  permissionedRender() {
    const permit = this.state.photoPermission;
    if (permit === 'authorized') {
      return (
        <CameraRollPicker
          callback={(image) => this.onImagePress(image)}
          assetTypes='Photos'
          groupTypes='SavedPhotos'
          selectSingleItem
          backgroundColor='#eee'
          loader=<Spinner size='large' />
        />
      );
    } else if (permit === 'undetermined') {
      Permissions.request('photo').then(response => {
        this.setState({ photoPermission: response });
        this.permissionedRender();
      });
    } else if (permit === 'denied') {
      this.props.navigation.navigate('DefaultImages');
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.permissionedRender()}
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => this.onCancelPress()}
          >
            Cancel
          </Button>
        </CardSection>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  const { uri } = state.announce;
  return { uri };
};

const Photos = connect(mapStateToProps, { addImage, isDefaultImage })(DevicePhotos);

export { Photos };
