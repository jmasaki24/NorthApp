/**
 * I don't know why we need to use redux for every get action
*/

import { GET_USERS_ANNOUNCEMENTS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_ANNOUNCEMENTS:
      return action.payload;
    default:
      return state;
  }
};
