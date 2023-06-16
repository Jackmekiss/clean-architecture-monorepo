import { memoize } from 'proxy-memoize';
import { RootState } from '../../../../initReduxStore';
import { Message, messagesAdapter } from '../../domain/message';

const messagesSelectors = messagesAdapter.getSelectors<RootState>((state) => state.messages);

export type MessageVM = Message & {
  isMe: boolean;
}

export const selectMessageById = (messageId: string) => memoize((state: RootState): { message: MessageVM | null } => {
  const message = messagesSelectors.selectById(state, messageId);

  if (!message) {
    return {
      message: null,
    };
  }

  return {
    message: {
      ...message,
      isMe: message.sender.id === state.account.data?.id,
    },
  };
});
