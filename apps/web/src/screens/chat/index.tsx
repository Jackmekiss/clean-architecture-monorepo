import ChatContent from '../../Components/Chat/ChatContent';
import ChatInput from '../../Components/Chat/ChatInput';
import Layout from '../../_main/Page/Layout';

function Chat() {
  return (
    <Layout withHeader>
      <ChatContent />
      <ChatInput />
    </Layout>
  );
}

export default Chat;
