import { ADD_AGENDAS } from '../actions/index';

// reducer for returning responses from POST calls
export default function(state = null, action) {
  switch (action.type) {
    case ADD_AGENDAS:
      return action.payload.status;
  }

  return state;
}
