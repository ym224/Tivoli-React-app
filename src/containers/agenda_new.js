import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { addAgendas } from '../actions/index';
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'

class AgendaNew extends Component {

  onSubmit(field) {
    const eventId = this.props.match.params.id;
    const agendas =
    [{
      "eventId": eventId,
      "title": field.title,
      "description": field.description,
      "creatorId": 1
    }]

    this.props.addAgendas(agendas).then(response =>{
          var status = response.payload.status;
          if (status === 200) {
            window.location.href=`/events/${eventId}`;
          }
        }).catch(err =>{
          console.log(err);
        });
  }

  renderTitleField(field) {
    return (
      <TextField hintText={field.placeholder}
        name="title"
        underlineStyle={{borderColor: '#212121'}}
        errorText={field.touched && field.error}
        {...field.input}
      />
    )
  };

  renderDurationField(field) {
    return (
      <TextField
        name="duration"
        style = {{width: 50}}
        errorText={field.touched && field.error}
        {...field.input}
      />
    )
  };

  renderTextArea(field) {
    return (
      <TextField hintText={field.placeholder}
        name="description"
        multiLine
        fullWidth
        rowsMax={3}
        underlineShow={false}
        errorText={field.touched && field.error}
        {...field.input}
      />
    )
  };

  renderSelectField({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) {
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    )
  };

  render() {
    const { handleSubmit } = this.props;
    const eventId = this.props.match.params.id;

    return (
      <div className="agenda-new-root">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <br/>
            <h3 className="primary-txt-agenda set-up-agenda">Set up Agenda
              <button type="submit" className="btn btn-create-agenda">
                <div className="primary-txt-agenda save-and-create">Save and Create</div>
              </button>
            </h3>
            <div className="secondary-txt-agenda">
              Meeting goals for every member
              <Link to={`/events/${eventId}`} className="btn btn-skip">
                <div className="primary-txt-agenda skip">Skip Agenda</div>
              </Link>
            </div>
          </div>
          <div>
            <Field className="primary-txt-agenda agenda-title"
              name="title"
              component={this.renderTitleField}
              placeholder="Segment Item Title"/>
            <div className="clear-inline"></div>
            <Field className="dropdown-agenda"
              name="moveTo"
              label="Move to..."
              component={this.renderSelectField}>
              <MenuItem value="Option1" primaryText="Option 1" />
              <MenuItem value="Option2" primaryText="Option 2" />
              <MenuItem selected="false" value="Option3" primaryText="Option 3" />
            </Field>
          </div>
          <div className="agenda-description">
            <Field className="secondary-txt-agenda"
              name="description"
              component={this.renderTextArea}
              placeholder="Describe the purpose and decisions to make for this meeting segment."
              />
          </div>
          <div>
            <label className="primary-txt-agenda">Duration:&nbsp;&nbsp;</label>
            <Field name="duration" component={this.renderDurationField} />
            <label className="secondary-txt-agenda">&nbsp;&nbsp;min</label>
          </div>
          <div>
            <a className="primary-txt-agenda add-new-segment" href="">+ Add New Segment</a>
          </div>
        </form>
			</div>
    );
  }
}

function validate(values) {
    const errors = {}
    const requiredFields = ['title', 'description']
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = 'Required'
      }
    })
    return errors
}

function mapStateToProps(state, ownProps) {
    const {id} = ownProps.match.params;

		return {
			event: state.events[id]
		};
}

export default reduxForm({
  form: 'AgendaNewForm'
})(connect(mapStateToProps, { addAgendas })(AgendaNew));
