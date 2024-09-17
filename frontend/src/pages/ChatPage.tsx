import React, { useState, useEffect } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { QuoteSummary } from '../components/QuoteSummary';
import { sendMessage, startChatSession } from '../services/chatService';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from '../utils/formatters';

// HUMAN ASSISTANCE NEEDED
// This component's confidence level is below 0.8. Please review and refine the implementation.

const ChatPage: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const dispatch = useDispatch();
  const quoteInfo = useSelector((state: any) => state.chat.quoteInfo);

  useEffect(() => {
    const initSession = async () => {
      const newSessionId = await startChatSession();
      setSessionId(newSessionId);
    };
    initSession();
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!sessionId) return;

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: message }]);

    try {
      const response = await sendMessage(sessionId, message);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: response.message }]);
      
      // Update quote information in the store
      // Note: This part might need adjustment based on the actual structure of the response and the store
      dispatch({ type: 'UPDATE_QUOTE_INFO', payload: response.quoteInfo });
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="chat-page">
      <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      <QuoteSummary 
        totalCost={formatCurrency(quoteInfo?.totalCost || 0)}
        items={quoteInfo?.items || []}
      />
    </div>
  );
};

export default ChatPage;