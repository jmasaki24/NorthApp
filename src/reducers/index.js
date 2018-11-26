import { combineReducers } from 'redux';
import AnnouncementReducer from './AnnouncementReducer';
import HomePageAnnouncementReducer from './HomePageAnnouncementReducer';
import ClubReducer from './ClubReducer';
import EventReducer from './EventReducers';

export default combineReducers({
  announce: AnnouncementReducer,
  HPannouncements: HomePageAnnouncementReducer,
  club: ClubReducer,
  event: EventReducer,
});
