import axios from 'axios';
import cheerio from 'react-native-cheerio';
import {
  GET_UPCOMING_GAMES,
  GET_SPORT_INFO
} from './types';
import {
  UPCOMING_GAMES_URL
} from './scrapeURLS';

export const getUpcomingGames = () => {
  const finalArray = [];
  return (dispatch) => {
    axios.get(UPCOMING_GAMES_URL)
      .then((response) => {
        if (response.status === 200) {
          const $ = cheerio.load(response.data);
          const upcomingGames = [];
          const games = $('.schedule-game a');

          for (let i = 0; i < games.length; i++) {
            if (games[i].parent.attribs.class === 'schedule-game  js-schedule-game schedule-game--timeline-future') {
              upcomingGames.push(games[i]);
            }
          } //sort all games in list into upcoming games

          for (let i = 0; i < upcomingGames.length; i++) {
            const len = upcomingGames[i].children.length;
            const sportArr = [];

            for (let j = 1; j < len; j += 2) {
              const text = upcomingGames[i].children[j].children[0].data;
              const key = upcomingGames[i].children[j].attribs.class;
              if (!text.includes('Click for more details!')) {
                sportArr.push([key.trim(), text]);
              }
            }
            finalArray.push(sportArr);
          }
        }
        dispatch({
          type: GET_UPCOMING_GAMES,
          payload: finalArray
        });
      });
  };
};

export const getSportInfo = (url) => {
  //figure our which url to scrape from

  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        if (response.status === 200) {
          const $ = cheerio.load(response.data);

          const scores = $('.datarow');
          console.log(scores);
        }
        dispatch({
          type: GET_SPORT_INFO,
          payload: null //TEMPORARY NULL
        });
      });
  };
};
