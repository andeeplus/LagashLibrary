import React, { Component } from 'react';
import Message from './Message/Message'

class MessageList extends Component {
  render() {
    return (
      <div>
        <Message />
        <Message />
        <Message />
      </div>
    );
  }
}

export default MessageList;