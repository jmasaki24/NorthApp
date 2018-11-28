/**
* Author: Matt Peters
* Last Edit: 11/28/2018
*/

import React from 'react';
import Select from './Select';

const SportSelect = (props) => props.data.map(sport =>
  <Select key={sport.title} sport={sport} />);

export default SportSelect;
