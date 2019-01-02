import React, { Component } from 'react';

class ChatLog extends Component {
  render() {
    return(
      <ul id="chat-log">
        {this.props.messages.map(message => {
          return (
           <li key={message._id} id="chat-message">
             <div id="sender-id">
               {message.senderId}
             </div>
             <div className="message-text">
               <p>{message.text}</p>
             </div>
           </li>
         )
       })}
     </ul>
    )
  };
}

export default ChatLog;
