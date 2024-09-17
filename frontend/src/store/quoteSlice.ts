import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuoteSummary, QuoteItem } from '../schema/quoteTypes';

interface QuoteState {
  currentQuote: QuoteSummary | null;
  items: QuoteItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: QuoteState = {
  currentQuote: null,
  items: [],
  isLoading: false,
  error: null,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setCurrentQuote: (state, action: PayloadAction<QuoteSummary>) => {
      state.currentQuote = action.payload;
    },
    setItems: (state, action: PayloadAction<QuoteItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<QuoteItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<{ id: string; updates: Partial<QuoteItem> }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentQuote,
  setItems,
  addItem,
  updateItem,
  removeItem,
  setLoading,
  setError,
} = quoteSlice.actions;

export default quoteSlice.reducer;