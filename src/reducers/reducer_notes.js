import { FETCH_NOTES } from '../actions/index';

export default function(state=[], action) {
  switch(action.type) {
    case FETCH_NOTES:
      return action.payload.data;
  }
  return state;
}


// export default function () {
//   return [
//     { id:1, eventId: "Note 1", note: "This is the first note"},
//     { id:2, eventId: "Note 2", note: "This is the second note"},
//     { id:3, eventId: "Note 3", note: "This is the third note"}
//   ];
// }
