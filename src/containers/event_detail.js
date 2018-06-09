import React,{ Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNotes, fetchEvents, fetchEvent } from '../actions/index';
import { bindActionCreators } from "redux";
import Agenda from "./agenda";
import AgendaList from "./agenda_list";
import NoteEditor from "./note_editor";

class EventDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      followups: [],
    };
    this.handlePinFollowUp = this.handlePinFollowUp.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(i) {
      const { followups } = this.state;
      this.setState({
       followups: followups.filter((followup, index) => index !== i),
      });
  }
  componentDidMount() {
    // const { id } = this.props.match.params;
    //this.props.fetchEvent(1, id);
  }
  convertDate(time){
    var date = new Date(time);
    return date.toDateString();
  }
  convertTime(time1, time2) {
    var date1 = new Date(time1);
    var date2 = new Date(time2);
    var hour1 = date1.getHours();
    var ampm1 = 'AM';
    var hour2 = date2.getHours();
    var ampm2 = 'AM';
    if (hour1 > 12){
      hour1 %= 12;
      ampm1 = 'PM';
    }
    if (hour2 > 12){
      hour2 %= 12;
      ampm2 = 'PM';
    }
    var start = String(hour1) + ':' + String(date1.getMinutes()).padStart(2,'0') + ampm1;
    var end = String(hour2) + ':' + String(date2.getMinutes()).padStart(2,'0') + ampm2;
    return (start + ' - ' + end);
  }

  showAttendees(attendees){
    if (attendees.length == 0) {
      return '';
    }
    var attendeesStr = attendees[0].firstName + ' ' + attendees[0].lastName;
    for (var i = 1; i < attendees.length; i++) {
      var firstName = attendees[i].firstName;
      var lastName = attendees[i].lastName;
      if (firstName == null && lastName == null) {
        continue;
      }
      if (firstName == null) {
        firstName = '';
      }
      if (lastName == null){
        lastName = '';
      }
      attendeesStr = (attendeesStr +', '+ firstName + ' ' + lastName);
    }
    return attendeesStr;
  }
  handlePinFollowUp(followupString) {
    console.log(followupString);
    // newFollowups = this.state.followups.append(followupString);
    //this.props.event['followups'] = this.props.event['followups'].append(followupString);
    this.setState((prevState, props) => ({
      counter: prevState.followups.push(followupString)
    }));
  }
  renderFollowups(followups){
    if (followups) {
      return followups.map((followup, index) => {
        return <div key={followup + Math.random()} className="followup-box">
                  <div className="followupString">{followup}</div>
                  <div className="delete-button" onClick={this.handleDelete.bind(this, index)}>
                    <img id="icon_close" alt="x" src="/images/tivoli_logo/icons/icon_close.png"/>
                  </div>
              </div>
      });
    }else {
      return null;
    }
  }
  render() {
    // if (!this.props.event || this.props.event.id != this.props.match.params.id) {
    //   return (<div>loading...</div>);
    // }

    // var link = `/feedback/${this.props.event.id}`;

    // const {id, agendas, title, status, location, startTime, endTime, creatorEmail, attendees} = this.props.event;
    return (
      <div className="row ml-0 event-detail">
        <div className="list-group col-9 event-detail-left-panel">
          <NoteEditor onPinFollowUp={this.handlePinFollowUp}/>
        </div>
        <div className="list-group col-3 event-detail-right-panel">
          {/* <div className="detail-box">
            <div className="title">{title}</div>
            <div className="details">
              <div>{this.convertDate(startTime)}</div>
              <div>{this.convertTime(startTime, endTime)}</div>
              <div>{location == null ? 'TBD':location}</div>
              <div>{this.showAttendees(attendees)}</div>
            </div>
          </div>
          <div className="linebreak"></div>*/}
          <div className="followups">
            <div className="detail-box">
              <div className="title">Preference</div>
              <div className="details">
                <p>Pin preference to build a profile. We will remind you with notifications.</p>
                <div> {this.renderFollowups(this.state.followups)}</div>
              </div>
            </div>
          </div>
          {/* <div className="btn-feedback">
            <Link to={link} style={{ textDecoration: 'none' }}>
              <p className="btn-feedback-txt">Rate</p>
            </Link>
          </div> */}
        </div>
      </div>
    );
  }
}

// function mapStateToProps({ events }, ownProps) {
//     return { event: events[ownProps.match.params.id] };
// }

function mapStateToProps(state) {
    return { event: state.event };
}

export default connect(mapStateToProps, {fetchEvent})(EventDetail);
