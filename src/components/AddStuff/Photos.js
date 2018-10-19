import React, { Component } from 'react';
import { View, CameraRoll } from 'react-native';
import { connect } from 'react-redux';
import CameraRollPicker from 'react-native-camera-roll-multi-picker';
import { Spinner, CardSection, Button } from '../common';
import { addImage, isDefaultImage } from '../../actions';

class Photos extends Component {
  onImagePress(image) {
    this.props.isDefaultImage(false);
    this.props.addImage(image);
    this.props.navigation.navigate('AddContent');
  }

  onCancelPress() {
    this.props.isDefaultImage(null);
    this.props.addImage('');
    this.props.navigation.navigate('DefaultImages');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CameraRollPicker
          callback={(image) => this.onImagePress(image)}
          assetTypes='Photos'
          selectSingleItem
          backgroundColor='#eee'
          loader=<Spinner size='large' />
        />
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

const styles = {
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center'
  }
};

const mapStateToProps = (state) => {
  const { uri } = state.announce;
  return { uri };
};

export default connect(mapStateToProps, { addImage, isDefaultImage })(Photos);
