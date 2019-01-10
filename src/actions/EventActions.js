import firebase from 'firebase';
import {
  ADD_EVENT_DATE,
  ADD_EVENT_TITLE,
  ADD_EVENT_LOCATION,
  ADD_EVENT_INFO,
  ADD_EVENT_HOUR,
  ADD_EVENT_MINUTE,
  ADD_EVENT_PERIOD,
  PUSH_EVENT,
  GET_CALENDAR,
  EDIT_EVENT,
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

export const addEventHour = (hour) => (
  {
    type: ADD_EVENT_HOUR,
    payload: hour
  }
);

export const addEventMinute = (hour) => (
  {
    type: ADD_EVENT_MINUTE,
    payload: hour
  }
);

export const addEventPeriod = (hour) => (
  {
    type: ADD_EVENT_PERIOD,
    payload: hour
  }
);

export const editEvent = ({ date, title, location, info, hour, minute, period, id }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  let time;
  if (hour === 'All Day') {
    time = 'All Day';
  } else {
    time = `${hour}:${minute} ${period}`;
  }
  const eventData = { date, title, location, info, uid, time, id };

  return (dispatch) => {
    firebase.database().ref(`/Calendar/${date}/${id}`).set(eventData);
    firebase.database().ref(`/Users/${uid}/Events/${id}`).set(eventData)
      .then(() => dispatch({ type: EDIT_EVENT }))
      .catch(error => console.log(error));
  };
};

export const pushEvent = ({ date, title, location, info, hour, minute, period }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  let time;
  if (hour === 'All Day') {
    time = 'All Day';
  } else {
    time = `${hour}:${minute} ${period}`;
  }
  const newEventKey = firebase.database().ref().child(`Calendar/${date}`).push().key;
  const eventData = { date, title, location, info, uid, time, id: newEventKey };

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
