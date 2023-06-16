import { map, reverse } from 'lodash';
import { useRetrieveMessageFeedQuery } from '../../../app';
import ChatContentItem from './ChatContentItem';

function ChatContent() {
  const { data } = useRetrieveMessageFeedQuery({ }, { selectFromResult: ({ data, ...rest }) => ({ data: (data?.ids || []) as string[], ...rest }) });

  return (
    <div
      style={{ height: 'calc(100vh - 150px)' }}
      className="overflow-y-scroll"
      id="chat-content"
    >
      {map(reverse([...data]), (messageId) => <ChatContentItem messageId={messageId} key={messageId} />)}
    </div>
  );
}

export default ChatContent;
