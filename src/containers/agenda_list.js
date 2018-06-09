import React ,{ Component }from 'react';
import {connect} from 'react-redux';
import { selectNote} from '../actions/index';
import Agenda from "./agenda";
import AgendaListItem from "./agenda_list_item";
import {bindActionCreators} from 'redux';

class AgendaList extends Component {
  renderList() {
    const {notes} = this.props;
    const {agendas} = this.props.event;

    if (notes.length == 0 && agendas.length > 0) {
      return agendas.map(agenda => {
        return (
          <AgendaListItem
            key={agenda.id}
            title={agenda.title}
            description={agenda.description}
            duration={agenda.duration}
            onSelectNote={() => this.props.selectNote(note)}
          />
        );
      });
    }
    return notes.map(note => {
      return (
        <AgendaListItem
          key={note.id}
          title={note.title}
          description={note.description}
          note={note}
          onSelectNote={() => this.props.selectNote(note)}
        />
      );
    });
  }


  render() {
    // if (this.props.notes.length == 0) {
    //   // TODO: add post action
    //   return (<button>+ Add New Item</button>);
    // } else {
      return (
          <ol >
            {this.renderList()}
          </ol>
      );
    // }
  }
}
function mapStateToProps(state) {
		return {
      event: state.event,
			notes: state.notes
		};
}

export default connect(mapStateToProps, { selectNote})(AgendaList);
