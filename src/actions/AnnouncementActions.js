// Should the names of the types and actions be more consistent???
// sorted by category for now

import firebase from '@firebase/app';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import {
  ADD_ID,
  ADD_IMAGE,
  ADD_INFO,
  ADD_TITLE,
  CLEAR,
  DEFAULT_IMAGE_BOOL,
  EDIT_ANNOUNCEMENT,
  GET_FROM_FIREBASE,
  GET_SUCCESS,
  PUSH_ANNOUNCEMENT,
  PUSHING_BOOLEAN,
} from './types';

export const clear = () => (
  {
    type: CLEAR,
  }
);

export const addID = (id) => (
  {
    type: ADD_ID,
    payload: id,
  }
);

export const addImage = (uri) => (
  {
    type: ADD_IMAGE,
    payload: uri,
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
          firebase.database().ref(`/Announcements/${id}`).set(announcementData).then()
          .catch(error => console.log(error));
          firebase.database().ref(`/Users/${uid}/Announcements/${id}`).set(announcementData)
            .then(() => dispatch({ type: EDIT_ANNOUNCEMENT }))
            .catch(error => console.log(error));
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
                        firebase.database().ref(`/Announcements/${id}`).set(announcementData);
                        firebase.database().ref(`/Users/${uid}/Announcements/${id}`)
                          .set(announcementData)
                          .then(() => dispatch({ type: EDIT_ANNOUNCEMENT }))
                          .catch(error => console.log(error));
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

      firebase.database().ref(`/Announcements/${id}`).set(announcementData)
        .then(() => dispatch({ type: EDIT_ANNOUNCEMENT }))
        .catch(error => console.log(error));
      firebase.database().ref(`/Users/${uid}/Announcements/${id}`).set(announcementData)
        .then(() => dispatch({ type: EDIT_ANNOUNCEMENT }))
        .catch(error => console.log(error));
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
          title, info, uri, isDefault, uid, dateString, id: newAnnouncementKey };

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
          .then((data) => Blob.build(data, { type: `${mime};BASE64` }))
          .then((blob) => {
            imageRef.put(blob, { contentType: mime })
            .then(() => {
              imageRef.getDownloadURL()
              .then((uri) => {
                const newAnnouncementKey =
                firebase.database().ref().child('Announcements').push().key;
                const announcementData = {
                  title, info, uri, isDefault, uid, dateString, id: newAnnouncementKey };

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
      const newAnnouncementKey =
      firebase.database().ref().child('Announcements').push().key;
      console.log(newAnnouncementKey);
      const announcementData = { title, info, isDefault, uid, dateString, id: newAnnouncementKey };

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

// FIXME: this type doesn't do anything in the reducer. does it need to?
export const getAnnouncements = () => {
 return (dispatch) => {
   firebase.database().ref('/Announcements')
    .once('value', snapshot => {
      dispatch({ type: GET_FROM_FIREBASE, payload: snapshot.val() });
    });
 };
};

export const getSuccess = () => (
  {
    type: GET_SUCCESS,
    payload: false,
  }
);

export const pushingBool = (bool) => (
  {
    type: PUSHING_BOOLEAN,
    payload: bool
  }
);
