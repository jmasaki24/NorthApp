import {
  GET_SPORT_SCHEDULE,
  GET_SPORT_SCORES,
  GET_UPCOMING_GAMES,
  LOADING,
  REMOVE_SCHEDULE,
  REMOVE_SCORES,
} from '../actions/types';

const INITIAL_STATE = {
  upcomingGames: null,
  scores: [],
  schedule: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SPORT_SCHEDULE:
     return { ...state, schedule: action.payload, loading: false };
    case GET_SPORT_SCORES:
      return { ...state, scores: action.payload, loading: false };
     case GET_UPCOMING_GAMES:
       return { ...state, upcomingGames: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: action.payload };
    case REMOVE_SCHEDULE:
      return { ...state, schedule: action.payload };
    case REMOVE_SCORES:
      return { ...state, scores: action.payload };
    default:
      return state;
  }
};
