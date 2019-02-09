import {
  GET_SUCCESS,
  GET_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  inital: {
    title: 'Not Connected',
    info: 'Please wait or connect to the Internet',
    img: '',
    isDefault: null,
    key: 'intial'
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    case GET_FAIL:
      return { ...state, loading: 'fail' };
    default:
      return state;
  }
};
