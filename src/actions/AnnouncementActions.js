import firebase from 'firebase';
import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_TO_FIREBASE
} from './types';

export const addImage = (hasImage, uri) => {
  return {
    type: ADD_IMAGE,
    payload: [hasImage, uri]
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

export const pushToFirebase = ({ hasImage, title, description, uri }) => {
  return (dispatch) => {
    dispatch({ type: PUSH_TO_FIREBASE });

    firebase.database().ref('/Announcements').push({
      hasImage,
      title,
      description,
      uri
    })
    .then(() => {})
    .catch(() => {});
  };
};
