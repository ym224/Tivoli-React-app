import React,{ Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import Rating from 'react-rating';
import { WithContext as ReactTags } from 'react-tag-input';
import { fetchEvent } from '../actions/index';

class Feedback extends Component {
  constructor(props){
      super(props);
      this.state = {
        feedback: 1,
        thumb: null,
        rating: 0,
        tags: [
            { id: "raising_money", selected: false, text: "Closer to raising money" },
            { id: "signed_deal", selected: false, text: "Signed a deal" },
            { id: "closer_to_deal", selected: false, text: "Closer to a deal" },
            { id: "great_referral", selected: false, text: "Great referral" },
            { id: "efficient_discussion", selected: false, text: "Efficient discussion" }
         ],
        suggestions: [
            { id: 'insights', text: 'Gained insights' },
         ]
      };

      this.updateFeedbackState = this.updateFeedbackState.bind(this);
      this.handleThumb = this.handleThumb.bind(this);
      this.handleRating = this.handleRating.bind(this);
      this.toggleSelectTag = this.toggleSelectTag.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchEvent(1, id);
  }
  handleRating(value){
    this.setState({
     rating: value
    });
  }

  handleThumb(thumbChoice){
    this.setState({
     thumb: thumbChoice
    });
  }

  renderTags(){
      return this.state.tags.map(tag => {
         return <div key={tag.id} className="feedback-tags"
           onClick={() => this.toggleSelectTag(tag)}
           className={tag.selected == false ? 'feedback-tag-default' : 'feedback-tag-selected'}>{tag.text}</div>
      });
  }

  toggleSelectTag(tag) {
      const { tags } = this.state;
      var index = tags.indexOf(tag);
      tag.selected = tag.selected == true ? false : true;
      tags[index] = tag;
      this.setState({tags: tags});
  }

  updateFeedbackState(value){
      const { feedback } = this.state;
      this.setState({
        feedback: value
      });
  }

  renderSwitch(param) {
      const { tags, suggestions } = this.state;

      switch(param) {
        case 1:
          return(
            <div className="feedback-box">
              <p className="feedback-font feedback-prompt">
                Did the meeting move me or the firm forward?
              </p>
              <div className="feedback-rating">
                <Rating
                  onChange={this.handleRating.bind(this)}
                  emptySymbol="fa fa-star-o fa-3x"
                  fullSymbol="fa fa-star fa-3x"
                  initialRating={this.state.rating}
                />
              </div>
            </div>
          );
        case 2:
          return(
            <div className="feedback-box">
              <p className="feedback-font feedback-prompt">
                How efficient was the time used?
              </p>
              <div className="feedback-rating">
                <div onClick={this.handleThumb.bind(this, "up")} className={this.state.thumb == "up" ? 'selected-thumbs': 'thumbs'}>
                  <img className="thumbs-image" alt="Good" src="/images/graphics/graphic_thumbsup.png"/>
                </div>
                <div onClick={this.handleThumb.bind(this, "down")} className={this.state.thumb == "down" ? 'selected-thumbs': 'thumbs'}>
                  <img className="thumbs-image" alt="Bad" src="/images/graphics/graphic_thumbsdown.png"/>
                </div>
              </div>
            </div>
          );
        case 3:
          return(
            <div className="feedback-box">
              <p className="feedback-font feedback-prompt">
                The meeting can be described as...
              </p>
              <div className="feedback-tags">
                {this.renderTags()}
              </div>
            </div>
          );
      }
  }

  renderButtonSwitch(param) {
    var feedbackState = this.state.feedback;

      switch(param) {
        case 1:
          return(
            <div>
              <div className="feedback-one-btn-wrapper">
                <button onClick={() => this.updateFeedbackState(feedbackState + 1)}
                  className="feedback-font btn btn-next">Next</button>
              </div>
              <div className="feedback-one-btn-wrapper">
                <button onClick={() => this.updateFeedbackState(feedbackState + 1)}
                  className="feedback-font btn btn-skip">Skip</button>
              </div>
            </div>
          );
        case 3:
          return(
            <div className="feedback-buttons-group">
              <button onClick={() => this.updateFeedbackState(feedbackState - 1)}
                className="feedback-font btn btn-prev">Prev</button>
              <Link to={`/`} style={{ textDecoration: 'none' }}>
              <button className="feedback-font btn btn-next">Submit</button>
              </Link>
            </div>
          );
        default:
          return(
            <div>
              <div className="feedback-buttons-group">
                <button onClick={() => this.updateFeedbackState(feedbackState - 1)}
                  className="feedback-font btn btn-prev">Prev</button>
                <button onClick={() => this.updateFeedbackState(feedbackState + 1)}
                  className="feedback-font btn btn-next">Next</button>
              </div>
              <div className="feedback-one-btn-wrapper">
                <button onClick={() => this.updateFeedbackState(feedbackState + 1)}
                  className="feedback-font btn btn-skip">Skip</button>
              </div>
          </div>
        );
      }
  }

  render() {
    if (!this.props.event || this.props.event.id != this.props.match.params.id) {
      return (<div>loading...</div>);
    }
    var grayDotImageSrc = "/images/graphics/bloo_dot-gray.png";
    var purpleDotImageSrc = "/images/graphics/bloo_dot-purple.png"
    var eventId = this.props.event.id;
    var feedbackState = this.state.feedback;
    return (
      <div>
        <div>
          <div className="indicator">
            <img className="dot-image" src={this.state.feedback == 1? purpleDotImageSrc: grayDotImageSrc}/>
            <img className="dot-image" src={this.state.feedback == 2? purpleDotImageSrc: grayDotImageSrc}/>
            <img className="dot-image" src={this.state.feedback == 3? purpleDotImageSrc: grayDotImageSrc}/>
          </div>
          <p className="feedback-font post-evaluation">Rapid Fire Questions</p>
          <p className="post-evaluation-description">
            Let's note down how the meeting went.
          </p>
        </div>
        {this.renderSwitch(feedbackState)}
        {this.renderButtonSwitch(feedbackState)}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { event: state.event };
}

export default connect(mapStateToProps, {fetchEvent})(Feedback);
