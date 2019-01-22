import {
  POLL_LOGIN,
  LOADING,
  ID_INPUT,
  AUTH_EDIT,
  PULL_POLL,
  SELECT_RUNNER
} from '../actions/types';

const INITIAL_STATE = {
  auth: null,
  identifyer: null,
  loading: false,
  ID: '',
  poll: null,
  selectedPresident: null,
  selectedSenate: null,
  selectedTreasurer: null,
  selectedVicePresident: null
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
    case PULL_POLL:
      return { ...state, poll: action.payload, loading: false };
    case SELECT_RUNNER:
      return { ...state, [action.payload.stateKey]: action.payload.value };
    default:
      return state;
  }
};
