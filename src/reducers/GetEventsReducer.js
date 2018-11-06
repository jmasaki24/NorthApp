import { GET_EVENTS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
