import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_ANNOUNCEMENT,
  DEFAULT_IMAGE_BOOL,
  GET_FROM_FIREBASE,
  GET_SUCCESS,
  PUSHING_BOOLEAN,
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

export const pushAnnouncement = ({ title, info, uri, isDefault }) => {
  console.log(title);
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
          .then(() => dispatch({ type: PUSH_ANNOUNCEMENT }))
          .catch();
      } else {
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const mime = 'image/jpeg';
        const name = `${+new Date()}-${uri}`;
        return new Promise((resolve, reject) => {
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file.//', '') : uri;
          const imageRef = firebase.storage().ref('napp_user_images').child(name);
          fs.readFile(uploadUri, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
              imageRef.put(blob, { contentType: mime })
                .then(() => {
                  imageRef.getDownloadURL()
                    .then((url) => {
                      const announcementData = { title, info, url, isDefault, uid, dateString };
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
      firebase.database().ref('/Announcements')
        .push({ title, info, uri, isDefault, uid, dateString })
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

export const pushingBool = (bool) => {
  return {
    type: PUSHING_BOOLEAN,
    payload: bool
  };
};
