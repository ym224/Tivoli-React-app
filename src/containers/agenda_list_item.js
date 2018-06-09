import React, { Component } from "react";
import NoteEditor from "./note_editor";

class AgendaListItem extends Component {
  render() {
    const {title, description, duration} = this.props;
    if (title) {
      return (
        <li className="agenda-list-item">
          <div>{title}</div>
          <div className="description">{description}</div>
          <div className="duration">20 min{duration}</div>
          <div className="border">
            <NoteEditor />
          </div>
          <hr/>
        </li>
      );
    } else {
      return null;
    }
  }
}

export default AgendaListItem;
