import firebase from 'firebase';
import {
  ADD_EVENT_DATE,
  ADD_EVENT_TITLE,
  ADD_EVENT_LOCATION,
  ADD_EVENT_DESCRIPTION,
  ADD_EVENT_TIME,
  PUSH_EVENT,
  GET_EVENTS,
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

export const addEventDescription = (text) => (
  {
    type: ADD_EVENT_DESCRIPTION,
    payload: text
  }
);

export const addEventTime = (time) => (
  {
    type: ADD_EVENT_TIME,
    payload: time
  }
);


export const pushEvent = ({ date, title, location, description }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const eventData = { date, title, location, description };
  const newEventKey = firebase.database().ref('/Events').push().key;

  const updates = {};
  updates[`/Events/${newEventKey}`] = eventData;
  updates[`/Calendar/${date}/${newEventKey}`] = eventData;

  return (dispatch) => {
    firebase.database().ref().update(updates)
      .push({ date, title, location, description, uid })
      .then(() => dispatch({ type: PUSH_EVENT }))
      .catch();
  };
};

export const getEvents = () => {
  return (dispatch) => {
  firebase.database().ref('/Events')
    .on('value', snapshot => {
      dispatch({ type: GET_EVENTS, payload: snapshot.val() });
    });
  };
};
