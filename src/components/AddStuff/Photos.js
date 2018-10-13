import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CameraRollPicker from 'react-native-camera-roll-multi-picker';
import { Spinner, CardSection, Button } from '../common';
import { addImage } from '../../actions';

class Photos extends Component {
  onImagePress() {
    //Set app levl state with redux Here
    this.props.navigation.navigate('AddContent');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CameraRollPicker
          callback={() => this.onImagePress()}
          assetTypes='Photos'
          selectSingleItem
          backgroundColor='#eee'
          loader=<Spinner size='large' />
        />
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => this.props.navigation.navigate('DefaultImages')}
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
  const { hasImage, uri } = state.announce;
  return { hasImage, uri };
};

export default connect(mapStateToProps, { addImage })(Photos);
