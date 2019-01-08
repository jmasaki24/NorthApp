import {
  POLL_LOGIN,
  LOADING,
  ID_INPUT,
  AUTH_EDIT
} from '../actions/types';

const INITIAL_STATE = {
  auth: null,
  identifyer: null,
  loading: false,
  ID: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POLL_LOGIN:
      return { ...state, auth: action.payload.auth, identifyer: action.payload.identifyer, loading: false, ID: '' };
    case ID_INPUT:
      return { ...state, ID: action.payload };
    case LOADING:
      return { ...state, loading: true };
    case AUTH_EDIT:
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};
