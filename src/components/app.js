import React from "react";
import { Component } from "react";
import EventList from "../containers/event_list";
import EventDetail from "../containers/event_detail";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    		events: [],
    		selectedEvent: null,
        notes: [],
        selectedNote: null,
    };
  }
  render() {
    return (
      <div>
        <EventList />
      </div>
    );
  }
}
