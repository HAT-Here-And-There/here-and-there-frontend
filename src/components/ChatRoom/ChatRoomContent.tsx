import { useState, useEffect } from 'react';
import { ChatRoomData } from '@_types/type';
import SockJS from 'sockjs-client';

interface ChatRoomContentProps {
  placeId: string | undefined;
}

export default function ChatRoomContent({ placeId }: ChatRoomContentProps) {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
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

    let sock: WebSocket | null = null;

    const connectWebSocket = () => {
      sock = new SockJS(`http://172.233.70.162/chat/place/`);

      sock.onopen = () => {
        console.log('Connected to WebSocket');
        setIsConnected(true);
        setWebsocket(sock);
      };

      sock.onmessage = (event) => {
        const newComment = JSON.parse(event.data);
        setComments((prevComments) => [...prevComments, newComment]);
      };

      sock.onclose = () => {
        console.log('Disconnected from WebSocket');
        setIsConnected(false);
        setWebsocket(null);
        setTimeout(connectWebSocket, 100);
      };
    };

    connectWebSocket();

    return () => {
      if (sock) {
        sock.close();
      }
    };
  }, [placeId]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (websocket && isConnected && newComment.trim()) {
      const comment = {
        placeId,
        text: newComment,
      };
      websocket.send(JSON.stringify(comment));
      setComments((prevComments) => [...prevComments, newComment]);
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
                className="w-[480px] h-full object-cover"
              />
            </div>
            <div className="w-[480px] h-[300px] flex-shrink-0 p-6">
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
          <div className="flex flex-col h-full lg:items-start bg-indigo-600 shadow-md rounded-lg overflow-hidden">
            <div className="w-full p-6 bg-indigo-700 text-white">
              <h2 className="text-2xl font-bold">{chatRoomData.name}</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-6 text-gray-200">
              <div
                className="flex flex-col-reverse space-y-4 space-y-reverse"
                style={{ maxHeight: 'calc(100vh - 300px)' }}
              >
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="w-96 ml-6 p-4 rounded-lg shadow-md flex items-start"
                  >
                    <img
                      src="/assets/HAT.svg"
                      alt="User avatar"
                      className="w-10 h-10 mr-4"
                    />
                    <p>{comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <form
              onSubmit={handleCommentSubmit}
              className="w-full p-6 bg-indigo-700"
            >
              <div className="flex items-center">
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
      </section>
    </div>
  );
}
