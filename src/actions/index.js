import axios from 'axios';

const SERVER_URL = `http://ec2-54-145-122-105.compute-1.amazonaws.com:8080`;
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENT = 'FETCH_EVENT';
export const FETCH_NOTES = 'FETCH_NOTES';
export const SELECT_NOTE = 'SELECT_NOTE';
export const ADD_AGENDAS = 'ADD_AGENDAS';

export function fetchEvents(userId) {
  const url = `${SERVER_URL}/userEvent?userId=${userId}`;
  const request = axios.get(url);
  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function fetchEvent(userId, eventId) {
  const url = `${SERVER_URL}/event?userId=${userId}&eventId=${eventId}`;
  const request = axios.get(url);
  return {
    type: FETCH_EVENT,
    payload: request
  };
}

export function fetchNotes(userId, eventId) {
  const url = `${SERVER_URL}/note?eventId=${eventId}&userId=${userId}`;
  // This is actually fetching agenda
  const request = axios.get(url);
  return {
    type: FETCH_NOTES,
    payload: request
  };
}
// dummy notes for demostration
// export function fetchNotes(notes) {
//   return {
//     type: FETCH_NOTES,
//     payload:notes
//   };
// }
export function selectNote(note) {
  return {
    type: SELECT_NOTE,
    payload: note
  };
}

export function addAgendas(agendas) {
  const url = `${SERVER_URL}/note/agenda`
  const response = axios.post(url, agendas);
  return {
    type: ADD_AGENDAS,
    payload: response
  };
}
