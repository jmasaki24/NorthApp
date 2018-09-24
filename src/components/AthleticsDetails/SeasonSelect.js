import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Card, CardSection, Button } from '../common';
import FallSportSelect from './SportSelect/FallSports';
import WinterSportSelect from './SportSelect/WinterSports';

class SeasonSelect extends Component {
  state = { expandFall: false, expandWinter: false, expandSpring: false }

  componentWillUpdate() {
    Animated.decay();
  }

  renderFall() {
    if (this.state.expandFall) {
      return <FallSportSelect />;
    }
  }

  renderWinter() {
    if (this.state.expandWinter) {
      return <WinterSportSelect />;
    }
  }

  renderSpring() {
    if (this.state.expandSpring) {
      return (
        <CardSection>
          <Text>Spring</Text>
        </CardSection>
      );
    }
  }

  render() {
    const { buttonStyle, buttonTextStyle } = styles;
    const { expandFall, expandSpring, expandWinter } = this.state;
    let fallIcon = 'angle-down';
    let winterIcon = 'angle-down';
    let springIcon = 'angle-down';
    if (expandFall) { fallIcon = 'angle-up'; }
    if (expandWinter) { winterIcon = 'angle-up'; }
    if (expandSpring) { springIcon = 'angle-up'; }

    return (
      <Card>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expandFall: !this.state.expandFall })}
            icon={<FontAwesome5 name={fallIcon} size={25} color={'black'} />}
          >
            Fall
          </Button>
        </CardSection>
        {this.renderFall()}
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expandWinter: !this.state.expandWinter })}
            icon={<FontAwesome5 name={winterIcon} size={25} color={'black'} />}
          >
            Winter
          </Button>
        </CardSection>
        {this.renderWinter()}
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expandSpring: !this.state.expandSpring })}
            icon={<FontAwesome5 name={springIcon} size={25} color={'black'} />}
          >
            Spring
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
