import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoomData } from '@_types/type';
import SockJS from 'sockjs-client';
import { chatProps } from '@_types/type';

interface ChatRoomContentProps {
  placeId: string | undefined;
}

export default function NewChatRoomContent({ placeId }: ChatRoomContentProps) {
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [frontSocket, setFrontSocket] = useState<WebSocket | null>(null);
  const [comments, setComments] = useState<chatProps[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const navigate = useNavigate();

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

  if (!chatRoomData) {
    return <div>Loading...</div>;
  }

  console.log(comments);

  return (
    <div className="container mx-1 my-1 px-0 py-0">
      <div className="w-full h-full flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gray-200 text-gray-700 p-2 rounded">
          뒤로 가기
        </button>
        <section className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden w-full">
          {/* Left Section: Place Card */}
          <div className="w-full lg:w-1/2 p-4">
            <div className="flex flex-col items-center lg:items-start bg-gray-100 shadow-md rounded-lg overflow-hidden">
              <div className="w-full h-[560px] flex-shrink-0 mb-4 lg:mb-0">
                <img
                  src={chatRoomData.imageUrl}
                  alt={chatRoomData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-[300px] flex-shrink-0 p-6">
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
            <div className="flex flex-col h-full bg-indigo-600 shadow-md rounded-lg overflow-hidden">
              <div className="w-full p-6 bg-indigo-700 text-white">
                <h2 className="text-2xl font-bold">{chatRoomData.name}</h2>
              </div>
              <div className="flex-grow overflow-y-auto p-6 text-gray-200">
                <div
                  className="flex flex-col space-y-4"
                  style={{ maxHeight: 'calc(100vh - 300px)' }}
                >
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="w-full p-4 rounded-lg shadow-md flex items-start mb-2 bg-gray-100 text-black"
                    >
                      <img
                        src="/assets/HAT.svg"
                        alt="User avatar"
                        className="w-10 h-10 mr-4"
                      />
                      <div className="my-2 text-lg">{comment.content}</div>
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
                    autoComplete="off"
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
    </div>
  );
}
