import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import config from './config.json';

const Icon = createIconSetFromFontello(config);

const icon = ({ src, size, color, styles, selected }) => (
  <Icon name={src} size={size} color={color} style={styles} selected={selected} />
);

icon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  styles: PropTypes.object,
  selected: PropTypes.boolean
};

module.exports = icon;
