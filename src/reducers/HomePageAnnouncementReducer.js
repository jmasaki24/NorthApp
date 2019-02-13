import {
  GET_SUCCESS,
  GET_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  data: {
    inital: {
      title: 'Not Connected',
      info: 'Please wait or connect to the Internet',
      img: '',
      isDefault: null,
      key: 'intial'
    },
  },
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUCCESS:
      return { data: action.payload, error: false };
    case GET_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
