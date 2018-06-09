import { SELECT_NOTE } from '../actions/index';
export default function(state = null, action) {
  switch (action.type) {
    case SELECT_NOTE:
      return action.payload;
  }

  return state;
}
