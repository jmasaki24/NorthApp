import React, { Component } from 'react';
import { Text, LayoutAnimation } from 'react-native';
import { Card, CardSection, Button } from '../common';

class SeasonSelect extends Component {
  state = { expandFall: false, expandWinter: false, expandSpring: false }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderFall() {
    if (this.state.expandFall) {
      return (
        <CardSection>
          <Text>Fall</Text>
        </CardSection>
      );
    }
  }

  renderWinter() {
    if (this.state.expandWinter) {
      return (
        <CardSection>
          <Text>Winter</Text>
        </CardSection>
      );
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
            onPress={() => this.setState({ expandSpriing: !this.state.expandSpring })}
          >
            Spring
          </Button>
        </CardSection>

        {this.renderSpring()}

        <CardSection>
          <Button
            buttonStyle={buttonStyle}
            textStyle={buttonTextStyle}
          >
            Summer?
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: 'white'
  },
  buttonTextStyle: {
    color: 'black'
  }
};

export default SeasonSelect;
