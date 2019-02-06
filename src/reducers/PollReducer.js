import {
  VOTE_CAST,
  ID_INPUT,
  LOADING,
  POLL_LOGIN,
  PULL_POLL,
} from '../actions/types';

const INITIAL_STATE = {
  auth: null, // bool
  loading: false,
  voter: null, // obj about voter
  id: '',
  polls: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VOTE_CAST:
      return { ...INITIAL_STATE };
    case ID_INPUT:
      return { ...state, id: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    case POLL_LOGIN: {
      const { auth, voter, id } = action.payload;
      return { ...state, auth, voter, id, loading: false, };
    }
    case PULL_POLL:
      return { ...state, polls: action.payload, loading: false };
    default:
      return state;
  }
};
