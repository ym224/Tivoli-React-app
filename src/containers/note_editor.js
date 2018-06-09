import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import getContentStateFragment from 'draft-js/lib/getContentStateFragment';
import { Link } from 'react-router-dom';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onBulletClick() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }
  _onPinFollowUpClick() {
    const fragment = getContentStateFragment(this.state.editorState.getCurrentContent(), this.state.editorState.getSelection());
    const plainText = fragment.map((block) => block.getText()).join('');
    this.props.onPinFollowUp(plainText);
  }
  _onShare(){
    console.log(this.state.editorState.getCurrentContent().getPlainText());
    // TODO: download action
    // TODO: save to backend
  }
  render() {
    return (
      <div className="note-editor">
        <div className="note-editor-buttons">
          {/* <Link id="note-editior-back-button" to="/" style={{ textDecoration: 'none'}}>&lt;Back</Link> */}
          <div className="linebreak"></div>
          <div className="button" onClick={this._onBoldClick.bind(this)}>B</div>
          <div className="button" onClick={this._onUnderlineClick.bind(this)}>U</div>
          <div className="button" onClick={this._onBulletClick.bind(this)}>Bullet</div>
          <div className="linebreak"></div>
          <div className="button" onClick={this._onPinFollowUpClick.bind(this)}>Pin Preference</div>
          <div className="linebreak"></div>
          <div className="button" onClick={this._onShare.bind(this)}><img id="share_icon" alt="" src="/images/tivoli_logo/icons/icon_share.png"/>Share</div>
          <div className="linebreak"></div>
        </div>
        <div className="note-editor-editable">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default NoteEditor;
