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
  ADD_INFO,
  CLEAR,
  ADD_ID
} from './types';

export const clear = () => {
  console.log('CLEARED FORM');
  return {
    type: CLEAR,
  };
};

export const addID = (id) => {
  return {
    type: ADD_ID,
    payload: id
  };
};

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

export const editAnnouncement = ({ title, info, img, isDefault, id }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  let date = new Date();
  date = date.toString().split(' ');
  const dateString = (`${date[0]} ${date[1]} ${date[2]}`);
  console.log('edit');

  return (dispatch) => {
    if (img) {
      if (isDefault) {
          const uri = img;
          const announcementData = { title, info, uri, isDefault, uid, dateString, id };
          firebase.database().ref(`/Announcements/${id}`).set(announcementData);
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
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` });
            })
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
        .then(() => { dispatch({ type: EDIT_ANNOUNCEMENT }); console.log('not here'); })
        .catch(error => console.log(error));
      firebase.database().ref(`/Users/${uid}/Announcements/${id}`).set(announcementData)
        .then(() => { dispatch({ type: EDIT_ANNOUNCEMENT }); console.log('here'); })
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
  console.log('push');

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
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` });
          })
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
