// Thanks to @bacon and the guy who wrote the medium article

import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import LicensesListItem from './LicensesListItem';

import Data from './licenses.json';
import licenseItems from './licenseItems.json';

function extractNameFromGithubUrl(url) {
  if (!url) {
    return null;
  }

  const reg
    = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);
  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}

function sortDataByKey(data, key) {
  data.sort((a, b) => {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let licenses = Object.keys(Data).map(key => {
  let { licenses, ...license } = Data[key];
  let [name, version] = key.split('@');

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  let username =
    extractNameFromGithubUrl(license.repository) ||
    extractNameFromGithubUrl(license.licenseUrl);
  let userUrl;
  let image;
  if (username) {
    username = capitalizeFirstLetter(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(licenses, 'username');

export default class Licenses extends Component {
  renderItem = ({ item }) => <LicensesListItem {...item} />;
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 10, marginHorizontal: 10 }}>
          Here are the open-source projects we use!</Text>
        <Text style={{ marginBotton: 10, marginHorizontal: 10 }}>
          We included this page as a "Thank you" (and for legal reasons)</Text>
        <FlatList
          style={styles.list}
          keyExtractor={({ key }) => key}
          data={licenseItems}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
