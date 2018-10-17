import { combineReducers } from 'redux';
import AnnouncementReducer from './AnnouncementReducer';
import HomePageAnnouncementReducer from './HomePageAnnouncementReducer';

export default combineReducers({
  announce: AnnouncementReducer,
  HPannouncements: HomePageAnnouncementReducer
});
