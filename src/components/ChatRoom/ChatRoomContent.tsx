import { useState, useEffect } from 'react';
import { ChatRoomData } from '@_types/type';
import SockJS from 'sockjs-client';
import { Client, IStompSocket } from '@stomp/stompjs';

interface ChatRoomContentProps {
  placeId: string | undefined;
}

export default function ChatRoomContent({ placeId }: ChatRoomContentProps) {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    async function getChatRoomData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/places/${placeId}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setChatRoomData(result);
      } catch (error) {
        console.error('Failed to fetch chat room data:', error);
      }
    }

    if (placeId) {
      getChatRoomData();
    }
  }, [placeId]);

  useEffect(() => {
    if (!placeId) return;

    const sock = new SockJS(`http://172.233.70.162/chat/place/`) as IStompSocket;
    const client = new Client();

    client.webSocketFactory = () => sock;

    client.onConnect = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      client.subscribe(`/topic/place/${placeId}`, (message) => {
        const newComment = JSON.parse(message.body);
        setComments((prevComments) => [...prevComments, newComment]);
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
        console.log('Disconnected from WebSocket');
        setIsConnected(false);
      }
    };
  }, [placeId]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (stompClient && isConnected && newComment.trim()) {
      const comment = {
        placeId,
        text: newComment,
      };
      stompClient.publish({
        destination: `/app/place/${placeId}/comment`,
        body: JSON.stringify(comment),
      });
      setNewComment('');
    } else {
      console.log('Connection not established or empty comment');
    }
  };

  if (!chatRoomData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-0 py-0">
      <section className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Section: Place Card */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex flex-col items-center lg:items-start bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <div className="w-[875px] h-[560px] flex-shrink-0 mb-4 lg:mb-0">
              <img
                src={chatRoomData.imageUrl}
                alt={chatRoomData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[875px] h-[300px] flex-shrink-0 p-6">
              <h2 className="text-2xl font-bold mb-2">{chatRoomData.name}</h2>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">지역:</span> {chatRoomData.areaName}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">주소:</span> {chatRoomData.address}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">전화번호:</span> {chatRoomData.contact}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">운영 시간:</span> {chatRoomData.openingHours} ~ {chatRoomData.closingHours}
              </p>
            </div>
          </div>
        </div>
        {/* Right Section: Chat Room Card */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex flex-col items-center lg:items-start bg-indigo-600 shadow-md rounded-lg overflow-hidden">
            <div className="w-full p-6">
              <h2 className="text-2xl font-bold mb-2">{chatRoomData.name}</h2>
              <div className="text-gray-700 mb-4">
                {comments.map((comment, index) => (
                  <p key={index}>{comment}</p>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit} className="w-full mt-4">
                <label htmlFor="comment" className="block text-gray-700 mb-2">
                  댓글달기
                </label>
                <div className="flex items-center mb-2">
                  <input
                    id="comment"
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-grow p-2 border rounded-l-lg"
                    placeholder="댓글을 입력하세요..."
                    aria-label="댓글을 입력하세요"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white p-2 rounded-r-lg"
                  >
                    전송
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
