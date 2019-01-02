import React, { Component } from 'react';

var text = "";

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.addMsg = this.addMsg.bind(this);
  }

  addMsg() {
    const {addMsg} = this.props;
    text = document.getElementById("message-form").value;
    if (text === "") {
      return;
    }
    document.getElementById("message-form").value = "";
    var editor = document.getElementById("editor");
    editor.innerHTML = "";
    return <div>{addMsg(text)}</div>
  }

  onEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addMsg();
    }
  }

  render() {
    return(
      <div id="chat-input-section">
        <textarea type="text" id="message-form" data-emojiable="true"
        placeholder="Type a message..." onKeyDown = {(event) => this.onEnter(event)}/>
        <input type="submit" className="enter-button" id="submit-chat" value="↵"
        onClick= {this.addMsg}/>
      </div>
    )
  };
}

export default ChatInput;
