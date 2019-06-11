/**
 * Author: Matt Peters
 * could probably merge with AnnounceCardImage for byte savings...
 * purecomponent because it shallow compares the props so they don't have to re-render
 * we also need to optimize the more/less text button thing
*/

import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection } from './common';

class AnnounceCardAllText extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { expand: 'More', numLinesDescrip: 8 };
    this.expander = this.expander.bind(this);
  }

  expander() {
    if (this.state.expand === 'More') {
      this.setState({ expand: 'Less', numLinesDescrip: 50 }); //arbitrary number
    } else {
      this.setState({ expand: 'More', numLinesDescrip: 8 });
    }
  }

  renderBottomSection(props) {
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
      <CardSection style={{ justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
        <Text style={{ fontSize: 14 }}>
          {props.time}
        </Text>
        <TouchableOpacity
         onPress={this.expander}
        >
          <Text>{this.state.expand}</Text>
        </TouchableOpacity>
      </CardSection>
    );
  }

  render() {
    return (
      <Card style={{ elevation: 5 }}>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text adjustsFontSizeToFit style={styles.titleText}>{this.props.title}</Text>
        </CardSection>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <Text numberOfLines={this.state.numLinesDescrip} style={styles.descripText}>
            {this.props.children}</Text>
        </CardSection>
        {this.renderBottomSection(this.props)}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  descripText: {
    fontSize: 18,
    flex: 1,
    color: 'black',
    margin: 5,
  },
});

export default AnnounceCardAllText;
