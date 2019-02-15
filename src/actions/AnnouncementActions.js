// Should the names of the types and actions be more consistent???
// sorted by category for now

import firebase from '@firebase/app';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import {
  ADD_IMAGE,
  ADD_INFO,
  ADD_KEY,
  ADD_TITLE,
  CLEAR,
  DEFAULT_IMAGE_BOOL,
  EDIT_ANNOUNCEMENT,
  GET_SUCCESS,
  GET_FAIL,
  PUSH_ANNOUNCEMENT,
  PUSH_ANNOUNCEMENT_FAIL,
  IS_PUSHING_A,
} from './types';

export const clear = () => (
  {
    type: CLEAR,
  }
);

export const addImage = (uri) => (
  {
    type: ADD_IMAGE,
    payload: uri,
  }
);

export const addKey = (key) => (
  {
    type: ADD_KEY,
    payload: key,
  }
);

export const isDefaultImage = (bool) => (
  {
    type: DEFAULT_IMAGE_BOOL,
    payload: bool,
  }
);

export const infoAction = (text) => (
  {
    type: ADD_INFO,
    payload: text,
  }
);

export const titleAction = (text) => (
  {
    type: ADD_TITLE,
    payload: text,
  }
);

export const editAnnouncement = ({ title, info, img, isDefault, id }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  let date = new Date();
  date = date.toString().split(' ');
  const dateString = (`${date[0]} ${date[1]} ${date[2]}`);
  return (dispatch) => {
    if (img) {
      if (isDefault) {
          const uri = img;
          const announcementData = { title, info, uri, isDefault, uid, dateString, id };
          Promise.all([
            firebase.database().ref(`/Announcements/${id}`).set(announcementData),
            firebase.database().ref(`/Users/${uid}/Announcements/${id}`).set(announcementData)
          ]).then(() => dispatch({ type: EDIT_ANNOUNCEMENT }))
            .catch(() => dispatch({ type: PUSH_ANNOUNCEMENT_FAIL }));
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
            .then((data) => Blob.build(data, { type: `${mime};BASE64` }))
            .then((blob) => {
              imageRef.put(blob, { contentType: mime })
                .then(() => {
                  imageRef.getDownloadURL()
                    .then((uri) => {
                      const announcementData = {
                        title, info, uri, isDefault, uid, dateString, id };
                        Promise.all([
                          firebase.database().ref(`/Announcements/${id}`).set(announcementData),
                          firebase.database().ref(`/Users/${uid}/Announcements/${id}`)
                          .set(announcementData)
                        ]).then(() => dispatch({ type: EDIT_ANNOUNCEMENT }))
                          .catch(() => dispatch({ type: PUSH_ANNOUNCEMENT_FAIL }));
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
    } else { // for allText announcements
      const announcementData = { title, info, isDefault, uid, dateString, id };

      Promise.all([
        firebase.database().ref(`/Announcements/${id}`).set(announcementData),
        firebase.database().ref(`/Users/${uid}/Announcements/${id}`).set(announcementData)
      ]).then(() => dispatch({ type: EDIT_ANNOUNCEMENT }))
      .catch(() => dispatch({ type: PUSH_ANNOUNCEMENT_FAIL }));
    }
  };
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
        const newAnnouncementKey =
        firebase.database().ref().child('Announcements').push().key;
        const announcementData = {
          title, info, uri, isDefault, uid, dateString, key: newAnnouncementKey };

        const updates = {};
        updates[`/Announcements/${newAnnouncementKey}`] = announcementData;
        updates[`/Users/${uid}/Announcements/${newAnnouncementKey}`]
        = announcementData;

        firebase.database().ref().update(updates)
        .then(() => dispatch({ type: PUSH_ANNOUNCEMENT }))
        .catch(() => dispatch({ type: PUSH_ANNOUNCEMENT_FAIL }));
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
          .then((data) => Blob.build(data, { type: `${mime};BASE64` }))
          .then((blob) => {
            imageRef.put(blob, { contentType: mime })
            .then(() => {
              imageRef.getDownloadURL()
              .then((uri) => {
                const newAnnouncementKey =
                firebase.database().ref().child('Announcements').push().key;
                const announcementData = {
                  title, info, uri, isDefault, uid, dateString, key: newAnnouncementKey };

                const updates = {};
                updates[`/Announcements/${newAnnouncementKey}`] = announcementData;
                updates[`/Users/${uid}/Announcements/${newAnnouncementKey}`]
                = announcementData;

                firebase.database().ref().update(updates)
                .then(() => dispatch({ type: PUSH_ANNOUNCEMENT }))
                .catch(() => dispatch({ type: PUSH_ANNOUNCEMENT_FAIL }));
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
      const newAnnouncementKey =
      firebase.database().ref().child('Announcements').push().key;
      const announcementData = { title, info, isDefault, uid, dateString, key: newAnnouncementKey };

      const updates = {};
      updates[`/Announcements/${newAnnouncementKey}`] = announcementData;
      updates[`/Users/${uid}/Announcements/${newAnnouncementKey}`]
      = announcementData;

      firebase.database().ref().update(updates)
      .then(() => dispatch({ type: PUSH_ANNOUNCEMENT }))
      .catch(() => dispatch({ type: PUSH_ANNOUNCEMENT_FAIL }));
    }
  };
};

export const pushingAnnouncement = (bool) => (
  {
    type: IS_PUSHING_A,
    payload: bool
  }
);


// the following goes to HPannouncement reducer

// don't try to fix the únexpected block statement' action must not return a promise
//  (.once() returns a promise)
export const getAnnouncements = () => {
  return (dispatch) => {
    firebase.database().ref('/Announcements')
    .once('value', snapshot => {
      dispatch({ type: GET_SUCCESS, payload: snapshot.val() });
    }, () => {
      dispatch({ type: GET_FAIL, payload: true });
    });
  };
};
