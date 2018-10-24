import firebase from 'firebase';
import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_TO_FIREBASE,
  DEFAULT_IMAGE_BOOL,
  GET_FROM_FIREBASE
} from './types';

export const isDefaultImage = (bool) => {
  return {
    type: DEFAULT_IMAGE_BOOL,
    payload: bool
  };
};

export const addImage = (uri) => {
  return {
    type: ADD_IMAGE,
    payload: uri
  };
};

export const addDescription = (text) => {
  return {
    type: ADD_DESCRIPTION,
    payload: text
  };
};

export const addTitle = (text) => {
  return {
    type: ADD_TITLE,
    payload: text
  };
};

export const pushToFirebase = ({ title, info, uri, isDefault }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  let date = new Date();
  date = date.toString().split(' ');
  const dateString = (`${date[0]} ${date[1]} ${date[2]}`);

  return (dispatch) => {
    if (uri !== '') {
      if (isDefault) {
        firebase.database().ref('/Announcements')
          .push({ title, info, uri, isDefault, uid, dateString })
          .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
          .catch();
      } else {
        firebase.storage().ref()
          .put()
          .then(
            firebase.database().ref('/Announcements')
              .push({ title, info, uri, isDefault, uid, dateString })
              .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
              .catch()
          )
          .catch();
      }
    } else {
      firebase.database().ref('/Announcements')
        .push({ title, info, uri, isDefault, uid, dateString })
        .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
        .catch();
    }
  };
};

export const isDefault = (bool) => {
  return {
    type: DEFAULT_IMAGE_BOOL,
    payload: bool
  };
};

export const getAnnouncements = () => {
 return (dispatch) => {
   firebase.database().ref('/Announcements')
    .on('value', snapshot => {
      dispatch({ type: GET_FROM_FIREBASE, payload: snapshot.val() });
    });
 };
};
