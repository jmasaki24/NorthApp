import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import {
  ADD_IMAGE,
  ADD_DESCRIPTION,
  ADD_TITLE,
  PUSH_TO_FIREBASE,
  DEFAULT_IMAGE_BOOL,
  GET_FROM_FIREBASE,
  GET_SUCCESS
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
          .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
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
                      firebase.database().ref('/Announcements')
                        .push({ title, info, url, isDefault, uid, dateString })
                        .then(() => dispatch({ type: PUSH_TO_FIREBASE }))
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

export const getSuccess = () => {
  return {
    type: GET_SUCCESS,
    payload: false
  };
};
