import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import NotesReducer from './reducer_notes';
import ActiveNote from './reducer_active_note';
import ActiveEvent from './reducer_active_event';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  events: EventsReducer,
  event: ActiveEvent,
  notes: NotesReducer,
  activeNote: ActiveNote,
  postsResponse: PostsReducer,
  form: formReducer
});

export default rootReducer;
