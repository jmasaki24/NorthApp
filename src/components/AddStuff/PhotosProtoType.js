import React, { Component } from 'react';
import { View, Image, TouchableOpacity, CameraRoll, Dimensions, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common';
import { addImage, isDefaultImage } from '../../actions';

const numColumns = 3;
const { height, width } = Dimensions.get('window');

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

  getCRImages() {
    return (
      CameraRoll.getPhotos({ first: 1000, assetType: 'Photos' })
    );
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity>
        <Image
          resizeMode='contain'
          style={Styles.imageStyle}
          source={{ uri: item.node.image.uri }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    console.log(this.getCRImages());
    const data = this.getCRImages();
    console.log(Object.values(data));
    console.log(Object.values(data)[2]);

    return (
      // <View style={{ flex: 1 }}>
      //   <FlatList
      //     style={Styles.listStyle}
      //     data={this.getCRImages()}
      //     renderItem={(item) => this.renderItem(item)}
      //     numColumns={numColumns}
      //   />
      //   <CardSection>
      //     <Button
      //       buttonStyle={Styles.buttonStyle}
      //       textStyle={{ color: 'black' }}
      //       onPress={() => this.onCancelPress()}
      //     >
      //       Cancel
      //     </Button>
      //   </CardSection>
      // </View>
      <View style={{ flex: 1 }}>
        <Text style={{ flex: 1 }}>Hello</Text>
        <CardSection>
          <Button
            buttonStyle={Styles.buttonStyle}
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

const Styles = {
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center'
  },
  listStyle: {
    backgroundColor: '#eee',
    flex: 1
  },
  imageStyle: {
    height: height / 3,
    width: width / 2
  }
};

const mapStateToProps = (state) => {
  const { uri } = state.announce;
  return { uri };
};

export default connect(mapStateToProps, { addImage, isDefaultImage })(Photos);
