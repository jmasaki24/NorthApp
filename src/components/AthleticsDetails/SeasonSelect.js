/**
* Author: Matt Peters
*/

import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection, Button } from '../common';
import SportSelect from './SportSelect';
import FallData from './SportsJSON/FallSportsButton.json';
import WinterData from './SportsJSON/WinterSportsButton.json';
import SpringData from './SportsJSON/SpringSportsButton.json';
import i18n from '../../utils/i18n'

class SeasonSelect extends Component {
  state = { expandFall: false, expandWinter: false, expandSpring: false }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderFall() {
    if (this.state.expandFall) {
      return <SportSelect data={FallData} />;
    }
  }

  renderWinter() {
    if (this.state.expandWinter) {
      return <SportSelect data={WinterData} />;
    }
  }

  renderSpring() {
    if (this.state.expandSpring) {
      return <SportSelect data={SpringData} />;
    }
  }

  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    const { expandFall, expandSpring, expandWinter } = this.state;
    let fallIcon = 'angle-right';
    let winterIcon = 'angle-right';
    let springIcon = 'angle-right';
    if (expandFall) { fallIcon = 'angle-down'; }
    if (expandWinter) { winterIcon = 'angle-down'; }
    if (expandSpring) { springIcon = 'angle-down'; }

    return (
      <Card>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expandFall: !expandFall })}
            icon={<FontAwesome5 name={fallIcon} size={25} color={'black'} />}
          >
            {i18n.t('FALL')}
          </Button>
        </CardSection>
        {this.renderFall()}
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expandWinter: !expandWinter })}
            icon={<FontAwesome5 name={winterIcon} size={25} color={'black'} />}
          >
            {i18n.t('WINTER')}
          </Button>
        </CardSection>
        {this.renderWinter()}
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expandSpring: !expandSpring })}
            icon={<FontAwesome5 name={springIcon} size={25} color={'black'} />}
          >
            {i18n.t('SPRING')}
          </Button>
        </CardSection>
        {this.renderSpring()}
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    color: 'black',
    alignSelf: 'flex-start'
  }
};

export default SeasonSelect;
