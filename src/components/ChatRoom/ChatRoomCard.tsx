import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { chatProps } from '@_types/type';
import { ChatRoomData } from '@_types/type';

interface ChatRoomCardProps {
  chatRoomData: ChatRoomData;
  placeId: string | undefined;
}

export default function ChatRoomCard({
  chatRoomData,
  placeId,
}: ChatRoomCardProps) {
  const [newComment, setNewComment] = useState<string>('');
  const [frontSocket, setFrontSocket] = useState<WebSocket | null>(null);
  const [comments, setComments] = useState<chatProps[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
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
  }, []);

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

  console.log(comments);

  return (
    <div className="w-[42%] h-full">
      <div className="flex flex-col h-full bg-chatRoomPurple rounded-lg overflow-scroll scroll-box">
        <div
          className="w-full h-[10%] bg-indigo-600 text-white flex justify-start items-center pl-4"
          id="chat-input-header"
        >
          <h2 className="text-2xl font-bold font-main">{chatRoomData.name}</h2>
        </div>
        <div id="message-content-box" className="grow">
          {comments.map((comment, index) => (
            <div key={index}>
              <img src="/assets/HAT.svg" alt="User avatar" className="" />
              <div>{comment.content}</div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleCommentSubmit}
          id="message-input-area"
          className="h-[10%] bg-indigo-600 flex items-center px-[5%]"
        >
          <div className="w-full flex justify-between gap-x-2 items-center">
            <input
              id="comment"
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              aria-label="댓글을 입력하세요"
              autoComplete="off"
              className="grow rounded-sm p-2"
            />
            <button type="submit" className="h-full">
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
