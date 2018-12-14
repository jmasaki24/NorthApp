import {
  ADD_IMAGE,
  ADD_TITLE,
  PUSH_ANNOUNCEMENT,
  DEFAULT_IMAGE_BOOL,
  GET_SUCCESS,
  PUSHING_BOOLEAN,
  EDIT_ANNOUNCEMENT,
  ADD_INFO
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  info: '',
  uri: '',
  isDefault: null,
  photoKey: null,
  refreshing: false,
  pushing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, uri: action.payload };
    case ADD_INFO:
      return { ...state, info: action.payload };
    case ADD_TITLE:
      console.log('state');
      return { ...state, title: action.payload };
    case DEFAULT_IMAGE_BOOL:
      return { ...state, isDefault: action.payload };
    case PUSHING_BOOLEAN:
      return { ...state, pushing: action.payload };
    case PUSH_ANNOUNCEMENT:
      return { ...state, ...INITIAL_STATE, pushing: false };
    case EDIT_ANNOUNCEMENT:
      return { ...state, ...INITIAL_STATE, pushing: false };
    case GET_SUCCESS:
      return { ...state, refreshing: action.payload };
    default:
      return state;
  }
};
