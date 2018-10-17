import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import AnnounceCardAllText from './AnnounceCardAllText';
import AnnounceCardImage from './AnnounceCardImage';
import announcementData from '../JSON/announcementData.json';
import { getAnnouncements } from '../actions';

const data = announcementData;
class HomePageItems extends Component {
  componentWillMount() {
    this.props.getAnnouncements();
  }

  //nextProps are the next set of props that this component
  //will be rendered with
  //this.props is still the old set of props
  //THIS METHOD WILL BECOME UNSAFE IN FUTURE REACT VERSIONS, AVOID USE
  //USE componentDidUpdate instead
  // componenetWillReceiveProps(nextProps) {
  //
  // }

  /*createTagArray() {
    return (arguments);
  }*/

  renderItem({ item }) {
    let uri;
    if (item.isDefault) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === item.uri) {
          uri = data[i].uri;
        }
      }

      return (
        <AnnounceCardImage title={item.title} image={{ uri }}>
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
    console.log(this.props.data);
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
  const data = Object.values(state.HPannouncements);
  return { data };
};

export default connect(mapStateToProps, { getAnnouncements })(HomePageItems);
