import Header from '@components/all/Header';
import { useParams } from 'react-router-dom';
import ChatRoomContent from '@components/ChatRoom/ChatRoomContent';

export default function ChatRoomPage() {
  const { placeId } = useParams();

  return (
    <>
      <Header />
      <ChatRoomContent placeId={placeId} />
    </>
  );
}
