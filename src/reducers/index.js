import { combineReducers } from 'redux';
import AnnouncementReducer from './AnnouncementReducer';
import HomePageAnnouncementReducer from './HomePageAnnouncementReducer';
import ClubReducer from './ClubReducer';

export default combineReducers({
  announce: AnnouncementReducer,
  HPannouncements: HomePageAnnouncementReducer,
  club: ClubReducer
});
