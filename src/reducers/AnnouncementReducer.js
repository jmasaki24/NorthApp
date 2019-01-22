import {
  ADD_ID,
  ADD_IMAGE,
  ADD_INFO,
  ADD_TITLE,
  CLEAR,
  DEFAULT_IMAGE_BOOL,
  EDIT_ANNOUNCEMENT,
  GET_SUCCESS,
  PUSH_ANNOUNCEMENT,
  PUSHING_BOOLEAN,
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
    case CLEAR:
      return { ...INITIAL_STATE };
    case DEFAULT_IMAGE_BOOL:
      return { ...state, isDefault: action.payload };
    case EDIT_ANNOUNCEMENT:
      return { ...state, ...INITIAL_STATE, pushing: false };
    case GET_SUCCESS:
      return { ...state, refreshing: action.payload };
    case PUSHING_BOOLEAN:
      return { ...state, pushing: action.payload };
    case PUSH_ANNOUNCEMENT:
      return { ...state, ...INITIAL_STATE, pushing: false };
    default:
      return state;
  }
};
