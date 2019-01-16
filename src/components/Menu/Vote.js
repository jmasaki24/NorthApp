import React, { Component } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
//import { CardSection } from '../common';

class Voting extends Component {
  state = { value: null };

  pickerItems(cans) {
    return cans.map((can) =>
      <Picker.Item label={can} value={can} />
    );
  }

  render() {
    console.log(`${this.props} ${this.state.value}`);
    const cans = Object.keys(this.props.candidates);
    return (
      <Picker
        selectedValue={this.state.value}
        onValueChange={(value) => this.setState({ value })}
      >
        <Picker.Item label={'None'} value={null} />
        {this.pickerItems(cans)}
      </Picker>
    );
  }
}

// const mapStateToProps = (state) => {
//   const {} = state.polls;
//   return {};
// };

const Vote = connect(null, {})(Voting);

export { Vote };
