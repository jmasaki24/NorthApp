import {
  ADD_IMAGE,
  ADD_TITLE,
  PUSH_ANNOUNCEMENT,
  DEFAULT_IMAGE_BOOL,
  GET_SUCCESS,
  PUSHING_BOOLEAN,
  EDIT_ANNOUNCEMENT,
  ADD_INFO,
  CLEAR,
  ADD_ID
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  info: '',
  img: '',
  isDefault: null,
  photoKey: null,
  refreshing: false,
  pushing: false,
  id: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ID:
      return { ...state, id: action.payload };
    case ADD_IMAGE:
      return { ...state, img: action.payload };
    case ADD_INFO:
      return { ...state, info: action.payload };
    case ADD_TITLE:
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
    case CLEAR:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
