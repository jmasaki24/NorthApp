import firebase from 'firebase';
import {
  ADD_EVENT_DATE,
  ADD_EVENT_TITLE,
  ADD_EVENT_LOCATION,
  ADD_EVENT_DESCRIPTION,
  PUSH_EVENT,
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

export const pushEvent = ({ date, title, location, description }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;

  return (dispatch) => {
    firebase.database().ref('/Events')
      .push({ date, title, location, description, uid })
      .then(() => dispatch({ type: PUSH_EVENT }))
      .catch();
  };
};
