/**
 * Author: Matt Peters
 * FIXME: something is causing this to re-render event tho it's a PureComponent
 * ALLText doesn't re-render, perhaps it has something to do with the image?
 * used by UsersAnnouncements, HomePageItems
*/

import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';

const { width, height } = Dimensions.get('window');

const renderBottomSection = (props) => {
  if (props.button) {
    return (
      <CardSection style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
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
    <CardSection style={{ justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 20 }}>
      <Text style={{ fontSize: 14 }}>
        {props.time}
      </Text>
    </CardSection>
  );
};
// title, uri, children, ; are props
class AnnounceCardImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
    this.setExpanded = this.setExpanded.bind(this);
  }

  setExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  renderCenterSection() {
    if (this.state.isExpanded) {
      return (
        <CardSection style={{ alignItems: 'center', borderBottomWidth: 0, flexDirection: 'column' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={this.setExpanded} style={{ flex: 1 }}
            >
              <Image
                resizeMode="contain"
                style={{ width, height: height / 2 }}
                source={{ uri: this.props.uri }}
              />
            </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 18, color: 'black' }}>{this.props.info}</Text>
        </CardSection>
      );
    }
    return (
      <CardSection style={{ alignItems: 'center', borderBottomWidth: 0 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.setExpanded}
          >
            <Image
              style={{ width: 150, height: 150, flex: 1, alignSelf: 'center' }}
              source={{ uri: this.props.uri }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, color: 'black' }}>{this.props.info}</Text>
        </View>
      </CardSection>
    );
  }

  render() {
    return (
      <Card style={{ marginBottom: 5, elevation: 5 }}>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </CardSection>
        {this.renderCenterSection()}
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
