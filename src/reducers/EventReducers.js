import {
  ADD_KEY,
  ADD_EVENT_DATE,
  ADD_EVENT_TITLE,
  ADD_EVENT_LOCATION,
  ADD_EVENT_INFO,
  ADD_EVENT_HOUR,
  ADD_EVENT_MINUTE,
  ADD_EVENT_PERIOD,
  CLEAR,
  EDIT_EVENT,
  PUSH_EVENT,
  PUSH_EVENT_FAIL,
  IS_PUSHING_E
} from '../actions/types';

const INITIAL_STATE = {
  date: '',
  title: '',
  location: '',
  info: '',
  hour: '12',
  minute: '00',
  period: 'AM',
  isPushingE: false,
  id: '',
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_KEY:
      return { ...state, id: action.payload };
    case ADD_EVENT_DATE:
      return { ...state, date: action.payload };
    case ADD_EVENT_TITLE:
      return { ...state, title: action.payload };
    case ADD_EVENT_LOCATION:
      return { ...state, location: action.payload };
    case ADD_EVENT_INFO:
      return { ...state, info: action.payload };
    case ADD_EVENT_HOUR:
      return { ...state, hour: action.payload };
    case ADD_EVENT_MINUTE:
      return { ...state, minute: action.payload };
    case ADD_EVENT_PERIOD:
      return { ...state, period: action.payload };
    case CLEAR:
      return { ...INITIAL_STATE };
    case EDIT_EVENT:
      return { ...state, ...INITIAL_STATE, isPushingE: false };
    case PUSH_EVENT:
        return { ...state, ...INITIAL_STATE, isPushingE: false };
    case PUSH_EVENT_FAIL:
        return { ...state, isPushingE: false, error: true };
    case IS_PUSHING_E:
      return { ...state, isPushingE: action.payload };
    default:
      return state;
  }
};
