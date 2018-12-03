import {
  GET_UPCOMING_GAMES,
  GET_SPORT_SCORES,
  //GET_SPORT_SCHEDULE
} from '../actions/types';

const INITIAL_STATE = {
  upcomingGames: null,
  sportInfo: { scores: null, schedule: null }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_UPCOMING_GAMES:
      return { ...state, upcomingGames: action.payload };
    case GET_SPORT_SCORES:
      return { ...state, sportInfo: { scores: action.payload } };
    // case GET_SPORT_SCHEDULE:
    //   return { ...state, sportInfo: { schedule: action.payload } };
    default:
      return state;
  }
};
