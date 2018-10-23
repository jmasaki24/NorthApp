import firebase from 'firebase';
import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_TO_FIREBASE,
  DEFAULT_IMAGE_BOOL,
  GET_FROM_FIREBASE_SUCCESS,
  PUSH_TO_FBSTORAGE
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

  return (dispatch) => {
    firebase.database().ref('/Announcements')
      .push({ title, info, uri, isDefault, uid })
      .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
      .catch(() => {});
  };
};

export const pushToFBStorage = () => {
  return (dispatch) => {
    firebase.storage().ref()
      .on()
      .then(() => dispatch({ type: PUSH_TO_FBSTORAGE }))
      .catch();
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
      dispatch({ type: GET_FROM_FIREBASE_SUCCESS, payload: snapshot.val() });
    });
 };
};
