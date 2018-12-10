import {
  GET_UPCOMING_GAMES,
  GET_SPORT_SCORES,
  LOADING,
  REMOVE_SCORES,
  GET_SPORT_SCHEDULE,
  REMOVE_SCHEDULE
} from '../actions/types';

const INITIAL_STATE = {
  upcomingGames: null,
  scores: [],
  schedule: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_UPCOMING_GAMES:
      return { ...state, upcomingGames: action.payload, loading: false };
    case GET_SPORT_SCORES:
      return { ...state, scores: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: action.payload };
    case REMOVE_SCORES:
      return { ...state, scores: action.payload };
    case GET_SPORT_SCHEDULE:
     return { ...state, schedule: action.payload, loading: false };
    case REMOVE_SCHEDULE:
      return { ...state, schedule: action.payload };
    default:
      return state;
  }
};
