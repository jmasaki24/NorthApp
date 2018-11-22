import {
  GET_UPCOMING_GAMES
} from '../actions/types';

const INITIAL_STATE = {
  upcomingGames: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_UPCOMING_GAMES:
      return { ...state, upcomingGames: action.payload };
      
    default:
      return state;
  }
};
