import firebase from 'firebase';
import {
  POLL_LOGIN,
  LOADING,
  ID_INPUT,
  PULL_POLL,
  VOTE_CAST,
} from './types';

export const castVote = (poll, questions) => {
  const db = firebase.database().ref('/Voting');

  return (dispatch) => {
    Promise.all(
      Object.keys(questions).map(q => {
        console.log(questions);
        console.log(q);
        if (questions[q]) {
          console.log(db.child(`/${poll.location}/${poll.key}/${q}/${questions[q]}`));
          db.child(`/${poll.location}/${poll.key}/${q}/${questions[q]}`).transaction((num) => {
            console.log(num);
            return num + 1;
          }).then((obj) => {
            console.log(obj);
          }).catch(() => {
            console.log('big catch');
          });
        }
        return Promise.resolve(); // returns null, could do Array.reduce()...
      })
    ).then(() => {
      console.log('then');
      dispatch({ type: VOTE_CAST });
    }).catch(() => {
      console.log('catch');
    });
  };
};

export const idChange = (text) => {
  return {
    type: ID_INPUT,
    payload: text
  };
};

export const isLoading = (bool) => {
  return {
    type: LOADING,
    payload: bool
  };
};

export const pollAuth = (input) => {
  let exists = false;
  let voterObj = {};
  return (dispatch) => {
    firebase.database().ref('/Voting/Authentication').child(input).once('value', snapshot => {
      exists = snapshot.exists();
      if (exists) {
        voterObj = { [snapshot.key]: snapshot.val() };
      }
      dispatch({ type: POLL_LOGIN, payload: { auth: exists, voter: voterObj, id: input, } });
    });
  };
};

export const pullPoll = (grade) => {
  let gradeString = '';
  if (grade === 9) {
    gradeString = 'freshman'; // sorry, I mistyped it in firebase...
  } else if (grade === 10) {
    gradeString = 'sophmores';
  } else if (grade === 11) {
    gradeString = 'juniors';
  } else if (grade === 12) {
    gradeString = 'seniors';
  }

  return (dispatch) => {
    let obj1 = {};
    let obj2 = {};
    Promise.all([
      firebase.database().ref(`/Voting/${gradeString}`)
        .once('value', snapshot => { obj1 = snapshot.val(); }),
      firebase.database().ref('/Voting/all')
      .once('value', snapshot => { obj2 = snapshot.val(); }),
    ]).then(() => {
      // using .map() the function doesn't operate on the obj1 (itself) I think...
      Object.keys(obj1).forEach(key => {
          obj2[key] = obj1[key];
      });
      dispatch({ type: PULL_POLL, payload: obj2 });
    });
  };
};
