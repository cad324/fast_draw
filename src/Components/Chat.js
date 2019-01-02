import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatLog from './ChatLog'

const socket = socketIOClient('http://localhost:5000/');

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
       messages: []
    }
  }

  componentDidMount() {
    console.log("Chat initialized");
    socket.emit('chatInit', {});
    socket.on('chatLoad', (chat) => {
      this.setState({
        messages: chat
      });
      console.log("Chat from server loaded");
      console.log(chat);
    });
  }

  componentDidUpdate() {
    var chat_log = document.getElementById("chat-log");
    chat_log.scrollTop = chat_log.scrollHeight - 400;
    if (this.state.messages.length > 0)  {

        socket.emit('messageAdded', this.state.messages[this.state.messages.length-1]);
    }
  }

  render() {
    return(
      <span id="chat-section">
        <ChatHeader/>
        <ChatLog messages={this.state.messages}/>
        <ChatInput addMsg = {(text) =>
          {this.setState({
            messages: [...this.state.messages, {senderId: this.props.senderId, text: text}]
          })}
        }
        />
      </span>
    )
  }

}

export default Chat;
