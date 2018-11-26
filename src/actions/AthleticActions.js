import axios from 'axios';
import cheerio from 'react-native-cheerio';
import {
  GET_UPCOMING_GAMES
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
          //console.log(games);

          for (let i = 0; i < games.length; i++) {
            //console.log(games[i].parent.attribs.class);
            if (games[i].parent.attribs.class === 'schedule-game  js-schedule-game schedule-game--timeline-future') {
              upcomingGames.push(games[i]);
            }
          } //sort all games in list into upcoming games
          //console.log(upcomingGames);

          for (let i = 0; i < upcomingGames.length; i++) {
            const len = upcomingGames[i].children.length;
            //console.log(len);
            const sportArr = [];

            for (let j = 1; j < len; j += 2) {
              const text = upcomingGames[i].children[j].children[0].data;
              //console.log(text);
              const key = upcomingGames[i].children[j].attribs.class;
              //console.log(key);
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
