// used for the Create_Announcements,

import {
  ADD_KEY,
  ADD_IMAGE,
  ADD_INFO,
  ADD_TITLE,
  CLEAR,
  DEFAULT_IMAGE_BOOL,
  EDIT_ANNOUNCEMENT,
  PUSH_ANNOUNCEMENT,
  PUSH_ANNOUNCEMENT_FAIL,
  IS_PUSHING_A,
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  info: '',
  img: '',
  isDefault: null,
  photoKey: null,
  isPushingA: false,
  id: '',
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_KEY:
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
      return { ...state, ...INITIAL_STATE, isPushingA: false, error: false };
    case PUSH_ANNOUNCEMENT:
      return { ...state, ...INITIAL_STATE, isPushingA: false, error: false };
    case PUSH_ANNOUNCEMENT_FAIL:
      return { ...state, error: true, isPushingA: false };
    case IS_PUSHING_A:
      return { ...state, isPushingA: action.payload };
    default:
      return state;
  }
};
