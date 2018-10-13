import React, { Component } from 'react';
import { Dimensions, Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Info from '../../JSON/AnnounceImage.json';
import { CardSection, Button } from '../common';
import { addImage } from '../../actions';

const data = Info;
const numColumns = 2;
const { height, width } = Dimensions.get('window');


class List extends Component {
  state = { Selected: '', photoSelect: false };

  onImagePress(text, key, uri) {
    this.setState({ headerText: text, Selected: key });

    this.props.addImage(true, uri);

    this.props.navigation.navigate('AddContent');
  }

  renderItem({ item }) {
    const { key, uri, text } = item;
    return (
      <TouchableOpacity
        style={styles.touchStyle}
        onPress={() => this.onImagePress(text, key, uri)}
      >
        <Image
          resizeMode='contain'
          style={{ height: height / 3, width: width / 2 }}
          source={{ uri }}
        />
        <Text style={styles.text}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={item => this.renderItem(item)}
          numColumns={numColumns}
        />
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => this.props.navigation.navigate('Photos')}
          >
            Select Image From Camera Roll
          </Button>
        </CardSection>
        <CardSection>
          <Button
            buttonStyle={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={() => this.props.navigation.navigate('AddContent')}
          >
            Cancel
          </Button>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  listItem: {
    flex: 1,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    minWidth: 150,
    maxWidth: 223,
    height: 304,
    maxHeight: 304,
    backgroundColor: '#eee',
  },
  list: {
    flex: 1,
    backgroundColor: '#eee'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  image: {
    flex: 1,
    height: 160,
    width: 160,
    alignSelf: 'center'
  },
  touchStyle: {
    flex: 1,
    alignSelf: 'center',
    margin: 5
  },
  buttonStyle: {
    borderColor: 'white',
    justifyContent: 'center',
  }
};

const mapStateToProps = ({ announce }) => {
  const { hasImage, uri } = announce;
  return { hasImage, uri };
};

export default connect(mapStateToProps, { addImage })(List);
