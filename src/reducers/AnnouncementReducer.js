import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_TO_FIREBASE,
  DEFAULT_IMAGE_BOOL,
  GET_SUCCESS,
  PUSH_TO_FBSTORAGE,
  GET_USER_IMAGE_KEY,
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  info: '',
  uri: '',
  isDefault: null,
  photoKey: null,
  refreshing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, uri: action.payload };

    case ADD_DESCRIPTION:
      return { ...state, info: action.payload };

    case ADD_TITLE:
      return { ...state, title: action.payload };

    case DEFAULT_IMAGE_BOOL:
      return { ...state, isDefault: action.payload };

    case PUSH_TO_FIREBASE:
      return INITIAL_STATE;

    case GET_SUCCESS:
      return { ...state, refreshing: action.payload };

    case GET_USER_IMAGE_KEY:
      return { ...state, photoKey: action.payload };

    default:
      return state;
  }
};
