import firebase from 'firebase';
import {
  ADD_EVENT_DATE,
  ADD_EVENT_TITLE,
  ADD_EVENT_LOCATION,
  ADD_EVENT_INFO,
  ADD_EVENT_TIME,
  PUSH_EVENT,
  GET_CALENDAR,
} from './types';

export const addEventDate = (date) => (
  {
    type: ADD_EVENT_DATE,
    payload: date
  }
);

export const addEventTitle = (text) => (
  {
    type: ADD_EVENT_TITLE,
    payload: text
  }
);

export const addEventLocation = (text) => (
  {
    type: ADD_EVENT_LOCATION,
    payload: text
  }
);

export const addEventInfo = (text) => (
  {
    type: ADD_EVENT_INFO,
    payload: text
  }
);

export const addEventTime = (time) => (
  {
    type: ADD_EVENT_TIME,
    payload: time
  }
);


export const pushEvent = ({ date, title, location, info }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const eventData = { date, title, location, info, uid };
  const newEventKey = firebase.database().ref().child(`Calendar/${date}`).push().key;

  const updates = {};
  updates[`/Users/${uid}/Events/${newEventKey}`] = eventData;
  updates[`/Calendar/${date}/${newEventKey}`] = eventData;

  return (dispatch) => {
    firebase.database().ref().update(updates)
      .then(() => dispatch({ type: PUSH_EVENT }))
      .catch();
  };
};

export const getCalendar = () => {
  return (dispatch) => {
  firebase.database().ref('/Calendar')
    .on('value', snapshot => {
      dispatch({ type: GET_CALENDAR, payload: snapshot.val() });
    });
  };
};
