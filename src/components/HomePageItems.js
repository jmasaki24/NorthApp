import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';
import { getAnnouncements } from '../actions';

console.disableYellowBox = true;

class HomePageItems extends Component {
  componentWillMount() {
    this.props.getAnnouncements();
  }

  renderItem({ item }) {
    if (item.isDefault) {
      return (
        <AnnounceCardImage title={item.title} image={{ uri: item.uri }}>
          {item.info}
        </AnnounceCardImage>
      );
    } else if (item.isDefault === false) {
      return (
        <AnnounceCardImage title={item.title} image={{ uri: item.uri.uri }}>
          {item.info}
        </AnnounceCardImage>
      );
    } else if (item.uri === '') {
      return (
        <AnnounceCardAllText title={item.title}>
          {item.info}
        </AnnounceCardAllText>
      );
    }
  }

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.props.data}
        renderItem={item => this.renderItem(item)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const data = Object.values(state.HPannouncements).reverse();
  return { data };
};

export default connect(mapStateToProps, { getAnnouncements })(HomePageItems);
