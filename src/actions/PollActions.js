import firebase from 'firebase';
import {
  POLL_LOGIN,
  LOADING,
  ID_INPUT,
  AUTH_EDIT,
  PULL_POLL
} from './types';
import tempIDs from '../JSON/TempID.json';

export const pollAuth = (ID) => {
  const idList = getIDs();
  let IDmatches = null;
  let alreadyVoted = null;
  let IDobj = null;

  const len = idList.length;

  for (let i = 0; i < len; i++) {
    if (idList[i].ID === ID) {
      IDmatches = true;
      alreadyVoted = idList[i].hasVoted;
      IDobj = idList[i];
      break;
    }
    IDmatches = false;
  }
  if (IDobj === null) {
    IDobj = {}; ///HERE is where i left off
  }

  if (IDmatches === true && alreadyVoted === false) {
    return {
      type: POLL_LOGIN,
      payload: { auth: true, identifyer: IDobj }
    };
  }
  return {
    type: POLL_LOGIN,
    payload: { auth: false, identifyer: { hasVoted: alreadyVoted } }
  };
};

export const idChange = (text) => {
  return {
    type: ID_INPUT,
    payload: text
  };
};

const getIDs = () => {
  //will become a action similar to getAnnouncements from AnouncmentActions.js
  const a = tempIDs;
  return a;
};

export const pollLoad = (bool) => {
  return {
    type: LOADING,
    payload: bool
  };
};

export const authSwitch = (bool) => {
  return {
    type: AUTH_EDIT,
    payload: bool
  };
};

export const pullPoll = (grade) => {
  let wordGrade = '';
  if (grade === 9) {
    wordGrade = 'freshmen';
  } else if (grade === 10) {
    wordGrade = 'sophmores';
  } else if (grade === 11) {
    wordGrade = 'juniors';
  } else if (grade === 12) {
    wordGrade = 'seniors';
  }

  return (dispatch) => {
    firebase.database().ref(`/Voting/${wordGrade}`)
      .once('value', snapshot => {
        dispatch({ type: PULL_POLL, payload: snapshot.val() });
      });
  };
};
