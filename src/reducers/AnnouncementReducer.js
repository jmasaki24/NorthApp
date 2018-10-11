import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE
} from '../actions/types';

const INITIAL_STATE = {
  hasImage: false,
  title: '',
  description: '',
  uri: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, hasImage: action.payload.hasImage, uri: action.payload.uri };

    case ADD_DESCRIPTION:
      return { ...state, description: action.payload };

    case ADD_TITLE:
      return { ...state, title: action.payload };

    default:
      return state;
  }
};
