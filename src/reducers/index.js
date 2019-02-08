import { combineReducers } from 'redux';
import AnnouncementReducer from './AnnouncementReducer';
import HomePageAnnouncementReducer from './HomePageAnnouncementReducer';
import ClubReducer from './ClubReducer';
import EventReducer from './EventReducers';
import AthleticsReducer from './AthleticsReducer';
import PollReducer from './PollReducer';

export default combineReducers({
  announce: AnnouncementReducer,
  athleticsInfo: AthleticsReducer,
  club: ClubReducer,
  event: EventReducer,
  HPannouncements: HomePageAnnouncementReducer,
  polls: PollReducer,
});
