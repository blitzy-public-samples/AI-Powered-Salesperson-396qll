import React, { useState, useEffect } from 'react';
import { sendMessage, startChatSession } from '../services/chatService';
import { useSelector, useDispatch } from '../store/chatSlice';
import MessageList from './MessageList';
import InputField from './InputField';
import FileUpload from './FileUpload';
import QuoteSummary from './QuoteSummary';

// HUMAN ASSISTANCE NEEDED
// The following component might need additional refinement for production readiness.
// Please review and adjust as necessary.

const ChatInterface: React.FC = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const chatState = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const newSessionId = await startChatSession();
        setSessionId(newSessionId);
      } catch (error) {
        console.error('Failed to start chat session:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    initializeChat();
  }, []);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      const response = await sendMessage(sessionId, message);
      setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <MessageList messages={messages} />
      <InputField onSendMessage={handleSendMessage} isLoading={isLoading} />
      <FileUpload />
      <QuoteSummary />
    </div>
  );
};

export default ChatInterface;