import _ from 'lodash';
import React ,{ Component }from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchEvents} from '../actions/index'
import {bindActionCreators} from 'redux';
import EventListItem from '../components/event_list_item';

class EventList extends Component {
	componentDidMount() {
    this.props.fetchEvents(8);
  }
  renderList(organizedEvents) {
		//console.log(organizedEvents);
		return _.map(organizedEvents, function(events, date) {
			var currentDate = date.split(" ");

			var dateDiv = (
				<div className="col-sm-1 dashboard-date-panel">
					<div className="dashboard-date">
						{currentDate[1]+" "+currentDate[2]}
						<br/>
						{currentDate[0]}
					</div>
				</div>
			);
			var formattedDiv = [];
			for (var i = 0; i < events.length; i++) {
				var event = events[i];
				var link = `/feedback/${event.id}`;//`/events/${event.id}`;

				formattedDiv.push(
				  <div
				    key={event.id}
						className="col-sm dashboard-event-div">
						<Link to={link} style={{ textDecoration: 'none'}}>
				    	<p className="dashboard-title">{event.title}</p>
							<div className="dashboard-event-list-item">
								<EventListItem event={event}/>
							</div>
						</Link>
				  </div>

				);
			}
			return (
				<div className="row" key={date}>
					{dateDiv}
					<div className="col-sm-11">
						{formattedDiv}
						<div className="dashboard-horizontal-line"></div>
					</div>
				</div>
			);

		});


		// return _.map(events, date => {
		// 	<div className="row">
		// 		<div className="col-sm">
		// 			{date}
		// 		</div>
		// 		{for(var i = 0; i < )}
		// 	</div>
		// });

	}
	// renderLayout(organizedEvents) {
	//
	// 	for (var key in organizedEvents) {
	// 		<div className="row">
	// 			<div className="col-sm">
	// 				{key}
	// 			</div>
	// 				{this.renderList(organizedEvents[key]);}
	// 		</div>
	// 	}
	// }
  render() {
		var organizedEvents = {}
		for (var i in this.props.events) {
			var date = new Date(this.props.events[i].startTime);
			var dateKey = date.toDateString();
			if (dateKey in organizedEvents) {
				var existingArray = organizedEvents[dateKey];
				existingArray.push(this.props.events[i]);
				organizedEvents[dateKey] = existingArray;
			} else {
				var eventsArray = new Array();
				eventsArray.push(this.props.events[i]);
				organizedEvents[dateKey] = eventsArray;
			}
		}
    return (
      <div className="list-group" style={{marginLeft:'0px'}}>
				{/* {this.renderLayout(organizedEvents)} */}
        {this.renderList(organizedEvents)}
			</div>
    );
  }
}

function mapStateToProps(state) {
		return {
			events: state.events
		};
}

export default connect(mapStateToProps,{ fetchEvents} )(EventList);
