/**
* Author: Matt Peters
* FIXME: something is causing this to re-render event tho it's a PureComponent
* ALLText doesn't re-render, perhaps it has something to do with the image?
*/

import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';


const renderBottomSection = (props) => {
  if (props.button) {
    return (
      <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: -1 }}>
          <Text style={{ fontSize: 14 }}>
          {props.time}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flex: -1, flexDirection: 'row' }}>
          <Icon.Button
            name="edit" onPress={props.onEditPress}
            iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
          />
          <Icon.Button
            name="trash-alt" onPress={props.onDelPress}
            iconStyle={{ marginRight: 0, color: '#999' }} backgroundColor='#fff'
          />
        </View>
      </CardSection>
  );
  }
  return (
    <CardSection style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
      <Text style={{ fontSize: 14 }}>
        {props.time}
      </Text>
    </CardSection>
  );
};
// title, uri, children, ; are props
class AnnounceCardImage extends PureComponent {
  componentWillMount() {
    Image.getSize(this.props.uri)
  }
  render() {
    return (
      <Card style={{ elevation: 5, marginHorizontal: 10 }}>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </CardSection>
        <CardSection style={{ alignItems: 'center', borderBottomWidth: 0, flexDirection: fd }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.setState({ imageModal: true, imageUri: item.uri })}
            >
              <Image
                style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
                source={{ uri: this.props.item.uri }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: 'black' }}>{this.props.info}</Text>
          </View>
        </CardSection>
        {renderBottomSection(this.props)}
      </Card>
    );
  }
}

  const styles = StyleSheet.create({
    titleText: {
      color: '#000',
      fontSize: 25,
      fontWeight: 'bold',
    }
  });

  export default AnnounceCardImage;
