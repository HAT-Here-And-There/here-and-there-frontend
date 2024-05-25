import Header from '@components/all/Header';
import { useParams } from 'react-router-dom';
import ChatRoomContent from '@components/ChatRoom/ChatRoomContent';
import Footer from '@components/all/Footer';

export default function ChatRoomPage() {
  const { placeId } = useParams();

  return (
    <>
      <Header />
      <ChatRoomContent placeId={placeId} />
    </>
  );
}
