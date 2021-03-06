// TODO: Figure out if we need this reducer

import { OPEN_CLUB } from '../actions/types';

const INITIAL_STATE = {
  item: {
    key: '000',
    name: 'ERROR',
    teacher: null,
    contact: null,
    description: 'Something went wrong. Please try... some other time'
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_CLUB:
      return { ...state, item: action.payload };
    default:
      return INITIAL_STATE;
  }
};
