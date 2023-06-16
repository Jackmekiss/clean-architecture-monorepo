import { createSlice } from '@reduxjs/toolkit';
import { messagesAdapter } from './domain/message';

export const messageSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    updateMessage: messagesAdapter.upsertOne,
    addMessage: messagesAdapter.addOne,
    removeMessage: messagesAdapter.removeOne,
    addManyMessage: messagesAdapter.addMany,
  },
  extraReducers: () => {},
});

export const {
  updateMessage,
  addMessage,
  removeMessage,
  addManyMessage,
} = messageSlice.actions;
