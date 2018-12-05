/**
* Author: Matthew Peters
*/

import axios from 'axios';
import cheerio from 'react-native-cheerio';
import {
  GET_UPCOMING_GAMES,
  GET_SPORT_SCORES,
  LOADING,
  REMOVE_SCORES
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

export const getSportScores = (url) => {
  const finalArray = [];
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        if (response.status === 200) {
          //console.log(response.data);
          const $ = cheerio.load(response.data);
          const scores = $('.datarow');
          const otherSchools = $('.span_test');
          // console.log(scores);
          // console.log(otherSchools);

          const scoreArray = [];

          const len = scores.length;
          console.log(otherSchools.length);
          if (len === otherSchools.length) {
            for (let i = 0; i < len; i++) {
              const thing = scores[i].children;
              //console.log(thing);
              const thingLen = thing.length;

              for (let j = 0; j < thingLen; j++) {
                if (thing[j].data === ' /col6&7 ') {
                  const otherTeam = otherSchools[i].children[1].children[0].data;
                  //console.log(otherTeam);
                  const score = thing[j].prev.children[0].data;
                  scoreArray.push({ otherTeam, score });
                }
              }
            }
          }

          for (let i = 0; i < scoreArray.length; i++) {
            scoreArray[i].score = scoreArray[i].score.trim();
            if (scoreArray[i].score !== '' && scoreArray.otherTeam !== '') {
              finalArray.push(scoreArray[i]);
            }
          }
          // console.log(scoreArray);
          // console.log(finalArray);
        }
        dispatch({
          type: GET_SPORT_SCORES,
          payload: finalArray.reverse()
        });
      })
      .catch(() => {
        console.log('failed to scrape');
        return {
          type: GET_SPORT_SCORES,
          payload: []
        };
      });
  };
};

export const load = (bool) => {
  return {
    type: LOADING,
    payload: bool
  };
};

export const removeScores = () => {
  return {
    type: REMOVE_SCORES,
    payload: []
  };
};