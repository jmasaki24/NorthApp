import { GET_CALENDAR } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CALENDAR:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
