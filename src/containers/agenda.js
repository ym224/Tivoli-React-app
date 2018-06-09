import React ,{ Component }from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchNotes, selectNote} from '../actions/index';
import NoteDetail from "./note_detail";
import {bindActionCreators} from 'redux';

class Agenda extends Component {
  componentDidMount() {
    this.props.fetchNotes(1, this.props.eventId);
  }
  renderList() {
    const {notes} = this.props;
    const {agendas} = this.props.event;

    if (notes.length >0 && notes[0].id != this.props.eventId) {
      return (<div>loading...</div>);
    }

    if (agendas.length > 0) {
      return agendas.map(agenda => {
        return (
          <li
            className="agenda-note-title-list"
            key={agenda.id}
            onClick={() => this.props.selectNote(note)}
          >
            <div className="agenda-note-title-list-div">
            {agenda.title}
            </div>
          </li>

        );
      });
    }
  }

  render() {
    if (this.props.event.agendas.length == 0) {
      // TODO: add post action
      return (<button>+ Add New Item</button>);
    } else {
      return (
        <ol>
          {this.renderList()}
        </ol>
      );
    }
  }
}

function mapStateToProps(state) {
		return {
      event: state.event,
			notes: state.notes
		};
}

export default connect(mapStateToProps, {fetchNotes, selectNote})(Agenda);
