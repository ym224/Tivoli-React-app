import React, { Component } from "react";

class EventListItem extends Component {
  convertTime(milliseconds) {
    var date = new Date(milliseconds);
    return date.toString();
  }
  render() {
    // TODO: add image icon for each attendees
    if (this.props.event) {
      return (
        <div >
          <div>{this.convertTime(this.props.event.startTime)}</div>
          <div>{this.props.event.location}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default EventListItem;
