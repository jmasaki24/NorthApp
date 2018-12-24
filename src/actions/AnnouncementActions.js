import firebase from '@firebase/app';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import {
  ADD_IMAGE,
  ADD_TITLE,
  PUSH_ANNOUNCEMENT,
  DEFAULT_IMAGE_BOOL,
  GET_FROM_FIREBASE,
  GET_SUCCESS,
  PUSHING_BOOLEAN,
  GET_USERS_ANNOUNCEMENTS,
  EDIT_ANNOUNCEMENT,
  ADD_INFO
} from './types';

export const isDefaultImage = (bool) => {
  return {
    type: DEFAULT_IMAGE_BOOL,
    payload: bool
  };
};

export const titleAction = (text) => {
  // console.log(text);
  return {
    type: ADD_TITLE,
    payload: text
  };
};

export const infoAction = (text) => {
  // console.log(text);
  return {
    type: ADD_INFO,
    payload: text
  };
};

export const addImage = (uri) => {
  return {
    type: ADD_IMAGE,
    payload: uri
  };
};

export const editAnnouncement = ({ title, info, uri, isDefault, id }) => {
  return null; //coming soon?
};

export const pushAnnouncement = ({ title, info, img, isDefault }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  let date = new Date();
  date = date.toString().split(' ');
  const dateString = (`${date[0]} ${date[1]} ${date[2]}`);

  return (dispatch) => {
    if (img !== '') {
      if (isDefault) {
          const uri = img;
          const announcementData = { title, info, uri, isDefault, uid, dateString };
          const newAnnouncementKey =
            firebase.database().ref().child('Announcements').push().key;

          const updates = {};
          updates[`/Announcements/${newAnnouncementKey}`] = announcementData;
          updates[`/Users/${uid}/Announcements/${newAnnouncementKey}`]
            = announcementData;

          firebase.database().ref().update(updates)
            .then(() => dispatch({ type: PUSH_ANNOUNCEMENT }))
            .catch();
      } else {
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const mime = 'image/jpeg';
        const name = `${+new Date()}-${img}`;
        return new Promise((resolve, reject) => {
          const uploadUri = Platform.OS === 'ios' ? img.replace('file.//', '') : img;
          const imageRef = firebase.storage().ref('napp_user_images').child(name);
          fs.readFile(uploadUri, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
              imageRef.put(blob, { contentType: mime })
                .then(() => {
                  imageRef.getDownloadURL()
                    .then((uri) => {
                      const announcementData = { title, info, uri, isDefault, uid, dateString };
                      const newAnnouncementKey =
                        firebase.database().ref().child('Announcements').push().key;

                      const updates = {};
                      updates[`/Announcements/${newAnnouncementKey}`] = announcementData;
                      updates[`/Users/${uid}/Announcements/${newAnnouncementKey}`]
                        = announcementData;

                      firebase.database().ref().update(updates)
                        .then(() => dispatch({ type: PUSH_ANNOUNCEMENT }))
                        .catch();
                    });
                })
                .catch();
            })
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
    } else {
      const announcementData = { title, info, isDefault, uid, dateString };
      const newAnnouncementKey =
        firebase.database().ref().child('Announcements').push().key;

      const updates = {};
      updates[`/Announcements/${newAnnouncementKey}`] = announcementData;
      updates[`/Users/${uid}/Announcements/${newAnnouncementKey}`]
        = announcementData;

      firebase.database().ref().update(updates)
        .then(() => dispatch({ type: PUSH_ANNOUNCEMENT }))
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
    .once('value', snapshot => {
      dispatch({ type: GET_FROM_FIREBASE, payload: snapshot.val() });
    });
 };
};

export const getUsersAnnouncements = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  return (dispatch) => {
    firebase.database().ref(`/Users/${uid}/Announcements`)
      .on('value', snapshot => {
        dispatch({ type: GET_USERS_ANNOUNCEMENTS, payload: snapshot.val() });
      });
  };
};

export const getSuccess = () => {
  return {
    type: GET_SUCCESS,
    payload: false
  };
};

export const pushingBool = (bool) => {
  return {
    type: PUSHING_BOOLEAN,
    payload: bool
  };
};
