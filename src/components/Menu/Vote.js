import React, { Component } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { selectRunner } from '../../actions';

class Voting extends Component {
  findValue(stateKey) {
    if (stateKey === 'selectedPresident') {
      return this.props.selectedPresident;
    } else if (stateKey === 'selectedSenate') {
      return this.props.selectedSenate;
    } else if (stateKey === 'selectedTreasurer') {
      return this.props.selectedTreasurer;
    } else if (stateKey === 'selectedVicePresident') {
      return this.props.selectedVicePresident;
    }
  }

  pickerItems(cans) {
    return cans.map((can) => <Picker.Item label={can} value={can} />);
  }

  render() {
    let stateKey = `selected${this.props.category}`;
    stateKey = stateKey.replace(' ', '');
    const cans = Object.keys(this.props.candidates);
    return (
      <Picker
        selectedValue={this.findValue(stateKey)}
        onValueChange={(value) => this.props.selectRunner(stateKey, value)}
      >
        <Picker.Item label={'None'} value={null} />
        {this.pickerItems(cans)}
      </Picker>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedPresident, selectedSenate, selectedTreasurer, selectedVicePresident } = state.polls;
  return { selectedPresident, selectedSenate, selectedTreasurer, selectedVicePresident };
};

const Vote = connect(mapStateToProps, { selectRunner })(Voting);

export { Vote };
