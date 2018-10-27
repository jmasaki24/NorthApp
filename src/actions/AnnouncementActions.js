import firebase from 'firebase';
import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_TO_FIREBASE,
  DEFAULT_IMAGE_BOOL,
  GET_FROM_FIREBASE,
  GET_SUCCESS,
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
    if (isDefault) {
      firebase.database().ref('/Announcements')
        .push({ title, info, uri, isDefault, uid })
        .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
        .catch();
    } else {
      firebase.database().ref('/Announcements')
        .push({ title, info, uri, isDefault, uid })
        .then(console.log('Regular Pushing Works'))
        .then(() => pushToFBStorage(dispatch))
        .catch();
    }
  };
};

const pushToFBStorage = ({ uri }) => {
  return (dispatch) => {
    firebase.storage().ref('/napp_user_images')
      .put({ uri })
      .then(console.log('I got here'))
      .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
      .catch(console.log('Something may have gone wrong'));
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

export const getSuccess = () => {
  return {
    type: GET_SUCCESS,
    payload: false
  };
};

// export const getPhotoKey = () => {
//   return (dispatch) => {
//     firebase.database().ref('/UserAnnouncementImageKey')
//       .on('value', snapshot => {
//         dispatch({ type: GET_USER_IMAGE_KEY, payload: snapshot.val() });
//       });
//   };
// };
