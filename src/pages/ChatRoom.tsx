import { useParams } from 'react-router-dom';

export default function ChatRoomPage() {
  const { placeId } = useParams();

  return <div>This is chat room {placeId} page</div>;
}
