import { Message, MessageSender } from '../message';

export const messageBuilder = ({
  id = 'message-id',
  content = 'message-content',
  createdAt = new Date(2022, 2, 2, 2, 2),
  sender = {
    id: 'user-id',
    username: 'user-username',
    avatar: {
      uri: 'user-avatar',
      height: 100,
      width: 100,
      extension: 'jpg',
      type: 'image',
    },
  },
  isProcessing = false,
}: {
  id?: string;
  content?: string;
  createdAt?: Date;
  sender?: MessageSender;
  isProcessing?: boolean;
} = {}) => {
  const props = {
    id,
    content,
    createdAt,
    sender,
    isProcessing,
  };

  return {
    withId(_id: string) {
      return messageBuilder({
        ...props,
        id: _id,
      });
    },
    withContent(_content: string) {
      return messageBuilder({
        ...props,
        content: _content,
      });
    },
    withSender(_sender: MessageSender) {
      return messageBuilder({
        ...props,
        sender: _sender,
      });
    },
    isProcessing(_isProcessing: boolean) {
      return messageBuilder({
        ...props,
        isProcessing: _isProcessing,
      });
    },
    createdAt(_createdAt: Date) {
      return messageBuilder({
        ...props,
        createdAt: _createdAt,
      });
    },
    build(): Message {
      return {
        id: props.id,
        content: props.content,
        createdAt: props.createdAt,
        sender: props.sender,
        isProcessing: props.isProcessing,
      };
    },
  };
};
