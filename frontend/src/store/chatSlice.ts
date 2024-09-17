import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, ChatSession } from '../schema/chatTypes';

interface ChatState {
  currentSession: ChatSession | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  currentSession: null,
  messages: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<ChatSession>) => {
      state.currentSession = action.payload;
      state.messages = [];
      state.error = null;
    },
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      state.isLoading = true;
      state.error = null;
    },
    receiveResponse: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { startSession, sendMessage, receiveResponse, setError, clearError } = chatSlice.actions;
export default chatSlice.reducer;