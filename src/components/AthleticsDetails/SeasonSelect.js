import React, { Component } from 'react';
import { Text, LayoutAnimation } from 'react-native';
import { Card, CardSection, Button } from '../common';
import FallSportSelect from './SportSelect/FallSports';
import WinterSportSelect from './SportSelect/WinterSports';

class SeasonSelect extends Component {
  state = { expandFall: false, expandWinter: false, expandSpring: false }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
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
    return (
      <Card>
        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
            onPress={() => this.setState({ expandFall: !this.state.expandFall })}
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
