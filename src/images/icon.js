import React from 'react'
import PropTypes from 'prop-types';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import config from './config.json';

const Icon = createIconSetFromFontello(config);

const icon = ({ src, size, color, styles }) => (
  <Icon name={src} size={size} color={color} style={styles} />
);

icon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  styles: PropTypes.object,
};

module.exports = icon;
