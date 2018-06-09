import { FETCH_EVENT } from '../actions/index';
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_EVENT:
      return action.payload.data;
      // return { ...state, [action.payload.data.id]: action.payload.data };
  }
  return state;
}
