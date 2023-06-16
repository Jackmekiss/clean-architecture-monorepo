import { createEntityAdapter } from '@reduxjs/toolkit';
import { Media } from '../../../shared/domain/media';

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: MessageSender;
  isProcessing?: boolean;
}

export interface MessageSender {
  id: string;
  username: string;
  avatar: Media;
}

export const messagesAdapter = createEntityAdapter<Message>({
  selectId: (message) => message.id,
});
