import React, { Component } from 'react';
import { connect } from 'react-redux';

class Voting extends Component {
  render() {
    console.log(this.props);
    return null;
  }
}

const Vote = connect(null, {})(Voting);

export { Vote };
