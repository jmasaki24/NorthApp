import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_TO_FIREBASE
} from '../actions/types';

const INITIAL_STATE = {
  hasImage: false,
  title: '',
  info: '',
  uri: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, hasImage: action.payload.hasImage, uri: action.payload.uri };

    case ADD_DESCRIPTION:
      return { ...state, info: action.payload };

    case ADD_TITLE:
      return { ...state, title: action.payload };

    case PUSH_TO_FIREBASE:
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};
