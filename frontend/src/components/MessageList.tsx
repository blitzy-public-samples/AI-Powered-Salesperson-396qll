import React from 'react';
import { Message } from '../schema/chatTypes';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          <p className="message-content">{message.content}</p>
          <span className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;