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
      //console.log('got to the reducer2');

      //Idk what you did jamie but whenever I run my debugger this above console log
      //showed up way to much without even touching the clubs portion of the app

      return INITIAL_STATE;
  }
};
