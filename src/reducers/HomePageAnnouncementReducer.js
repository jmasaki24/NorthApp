import {
  GET_FROM_FIREBASE,
} from '../actions/types';

const INITIAL_STATE = {
  inital: {
    title: 'Not Connected',
    info: 'Please wait or connect to the Internet',
    img: '',
    isDefault: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FROM_FIREBASE:
      return action.payload;
    default:
      return state;
  }
};
