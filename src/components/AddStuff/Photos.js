import React, { Component } from 'react';
import { Dimensions, View, CameraRoll, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import CameraRollPicker from 'react-native-camera-roll-multi-picker';
import { Spinner, CardSection, Button } from '../common';
import { addImage, isDefaultImage } from '../../actions';

const numColumns = 3;
const { height, width } = Dimensions.get('window');

class Photos extends Component {
  componentWillMount() {
    this.getData();
  }

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

  getData() {
    console.log(CameraRoll.getPhotos({ first: 100, assetType: 'Photos' }));
    return CameraRoll.getPhotos({ first: 100, assetType: 'Photos' });
  }

  // renderItem({ item }) {
  //   console.log(item);
  //   return (
  //     <TouchableOpacity />
  //   );
  //   // return (
  //   //   <TouchableOpacity>
  //   //     <Image
  //   //       style={{ height: height / 3, width: width / 2 }}
  //   //       source={{ uri}}
  //   //     />
  //   //   </TouchableOpacity>
  //   // );
  // }

  // render() {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <FlatList
  //         style={{ flex: 1 }}
  //         data={this.getData()}
  //         renderItem={item => this.renderItem(item)}
  //         numColumns={numColumns}
  //       />
  //       <CardSection>
  //         <Button
  //           buttonStyle={styles.buttonStyle}
  //           textStyle={{ color: 'black' }}
  //           onPress={() => this.onCancelPress()}
  //         >
  //           Cancel
  //         </Button>
  //       </CardSection>
  //     </View>
  //   );
  // }

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
