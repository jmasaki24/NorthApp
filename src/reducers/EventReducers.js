import {
  ADD_EVENT_DATE,
  ADD_EVENT_TITLE,
  ADD_EVENT_LOCATION,
  ADD_EVENT_INFO,
  ADD_EVENT_TIME,
  PUSH_EVENT,
} from '../actions/types';

const INITIAL_STATE = {
  date: '',
  title: '',
  location: '',
  info: '',
  time: '',
  pushing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EVENT_DATE:
      return { ...state, date: action.payload };
    case ADD_EVENT_TITLE:
      return { ...state, title: action.payload };
    case ADD_EVENT_LOCATION:
      return { ...state, location: action.payload };
    case ADD_EVENT_INFO:
      return { ...state, info: action.payload };
    case ADD_EVENT_TIME:
      return { ...state, time: action.payload };
    case PUSH_EVENT:
      return { ...state, ...INITIAL_STATE, pushing: false };
    default:
      return state;
  }
};
