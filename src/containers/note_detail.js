import React,{ Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";

class NoteDetail extends Component {
  render() {
    if (this.props.note) {
      return (
        <div>
          <div>Title: {this.props.note.title}</div>
          <div>Description: {this.props.note.description}</div>
          <div>Duration: {this.props.note.duration}</div>
        </div>
      );
    } else {
      return null;
    }

  }
}
function mapStateToProps(state) {
  return {
    note: state.activeNote
  };
}

export default connect(mapStateToProps)(NoteDetail);
