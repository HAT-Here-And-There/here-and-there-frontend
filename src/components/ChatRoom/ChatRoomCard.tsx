import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { chatProps } from '@_types/type';
import { ChatRoomData } from '@_types/type';

interface ChatRoomCardProps {
  chatRoomData: ChatRoomData;
  placeId: string | undefined;
}

export default function ChatRoomCard({ chatRoomData, placeId }: ChatRoomCardProps) {
  const [newComment, setNewComment] = useState<string>('');
  const [frontSocket, setFrontSocket] = useState<WebSocket | null>(null);
  const [comments, setComments] = useState<chatProps[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!placeId) return;

    const sock = new SockJS(`http://172.233.70.162/chat/place/`, false, {
      server: placeId,
    });

    sock.onopen = async () => {
      console.log('connection opened!');
      setFrontSocket(sock);
      setIsConnected(true);
    };

    sock.onmessage = (message) => {
      const parsedMessageData = JSON.parse(message.data);
      console.log(parsedMessageData);
      setComments((prev) => [parsedMessageData, ...prev]);
    };

    sock.onclose = () => {
      console.log('disconnected!');
      setIsConnected(false);
      setFrontSocket(null);
    };

    return () => {
      sock.close();
    };
  }, [placeId]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const sendingMessage = {
      userId: 1,
      content: newComment,
      originChatId: 'test',
    };

    if (isConnected && frontSocket) {
      frontSocket.send(JSON.stringify(sendingMessage));
    }
    setNewComment('');
  };

  return (
    <div className="w-full lg:w-1/2 p-4">
      <div className="flex flex-col h-full bg-chatRoomPurple shadow-md rounded-lg overflow-hidden">
        <div className="w-full p-8 bg-indigo-600 text-white">
          <h2 className="text-2xl font-bold font-main">{chatRoomData.name}</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-6 text-gray-200">
          <div className="flex flex-col space-y-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {comments.map((comment, index) => (
              <div key={index} className="w-full p-4 rounded-lg shadow-md flex items-start mb-2 bg-gray-100 text-black">
                <img src="/assets/HAT.svg" alt="User avatar" className="w-10 h-10 mr-4" />
                <div className="my-2 text-lg">{comment.content}</div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleCommentSubmit} className="w-full p-6 bg-indigo-600">
          <div className="flex items-center relative">
            <input
              id="comment"
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow p-2 border rounded-lg"
              placeholder="댓글을 입력하세요..."
              aria-label="댓글을 입력하세요"
              autoComplete="off"
            />
            <button type="submit" className="absolute right-0 bg-indigo-600 text-white text-lg p-4 rounded-r-lg">
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
