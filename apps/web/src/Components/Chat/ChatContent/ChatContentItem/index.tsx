import { selectMessageById } from '@core/dm/message/adapters/selectors/messageSelectors';
import { formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';
import { useAppSelector } from '../../../../hooks/useAppDispatch';

interface Props {
    messageId: string;
}

function ChatContentItem({ messageId }: Props) {
  const { message } = useAppSelector(selectMessageById(messageId));

  useEffect(() => {
    const element = document.getElementById('chat-content');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, []);

  if (!message) return null;

  return (
    <div className={`chat ${message.isMe ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={message.sender.avatar.uri} alt={`${message.sender.username}-avatar`} />
        </div>
      </div>
      <div className="chat-header">
        {message.sender.username}
        {' '}
        <time className="text-xs opacity-50">{formatDistanceToNow(new Date(message!.createdAt), { addSuffix: true })}</time>
      </div>
      <div className="chat-bubble">{message.content}</div>
      {!message.isProcessing && (
        <div className="chat-footer opacity-50">
          Delivered
        </div>
      )}
    </div>
  );
}

export default ChatContentItem;
