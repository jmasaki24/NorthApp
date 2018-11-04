import {
  ADD_EVENT_DATE,
  ADD_EVENT_TITLE,
  ADD_EVENT_LOCATION,
  ADD_EVENT_DESCRIPTION,
  PUSH_EVENT
} from '../actions/types';

const INITIAL_STATE = {
  date: '',
  title: '',
  location: '',
  description: '',
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
    case ADD_EVENT_DESCRIPTION:
      return { ...state, description: action.payload };
    case PUSH_EVENT:
      return { ...state, ...INITIAL_STATE, pushing: action.payload };
    default:
      return state;
  }
};
