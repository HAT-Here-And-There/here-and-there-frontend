import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { chatProps, commingMessageDataProp, PlaceChatProps } from '@_types/type';
import ChatReply from '@components/ChatRoom/ChatReply';
import ChatRoomCard from '@components/ChatRoom/ChatRoomCard';

export default function PlaceChat({ place, chatRoomData = null }: PlaceChatProps) {
  const [newComment, setNewComment] = useState<string>('');
  const [frontSocket, setFrontSocket] = useState<WebSocket | null>(null);
  const [comments, setComments] = useState<chatProps[]>([]);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [showChatRoomList, setShowChatRoomList] = useState<boolean>(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<chatProps[]>(comments);

  const fetchSavedPlaces = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`);
      if (!response.ok) {
        throw new Error('저장된 장소 불러오기 실패');
      }
      const data = await response.json();
      const savedPlaceIds = data.map((place: { id: string }) => place.id);
      setSavedPlaces(savedPlaceIds);
    } catch (error) {
      console.error('저장된 장소 불러오기 실패:', error);
    }
  };

  const handleSavePlace = async (placeId: string) => {
    const isSaved = savedPlaces.includes(placeId);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`, {
        method: isSaved ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: placeId }),
      });

      if (!response.ok) {
        throw new Error(isSaved ? '저장된 장소 삭제하기 실패' : '장소 저장 실패');
      }

      setSavedPlaces((prevSavedPlaces) => {
        const updatedSavedPlaces = isSaved
          ? prevSavedPlaces.filter((id) => id !== placeId)
          : [...prevSavedPlaces, placeId];
        return updatedSavedPlaces;
      });
    } catch (error) {
      console.error('장소 저장 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  useEffect(() => {
    commentsRef.current = comments;
  }, [comments]);

  useEffect(() => {
    const sock = new SockJS(`${import.meta.env.VITE_BACKEND_DOMAIN}/chat/place/`, false, {
      server: place.id,
    });

    sock.onopen = async () => {
      setFrontSocket(sock);
    };

    sock.onmessage = (message) => {
      const parsedMessageData: commingMessageDataProp = JSON.parse(message.data);
      const newData: chatProps = {
        id: parsedMessageData.id,
        userId: parsedMessageData.userId,
        content: parsedMessageData.content,
        timeStamp: parsedMessageData.timeStamp,
        replies: [],
      };

      if (parsedMessageData.originChatId === null) {
        setComments((prev) => [newData, ...prev]);
      } else {
        setComments((prev) =>
          prev.map((element) => {
            if (element.id === parsedMessageData.originChatId) {
              return {
                ...element,
                replies: element.replies ? [...element.replies, newData] : [newData],
              };
            }
            return element;
          })
        );
      }
    };

    sock.onclose = () => {
      setFrontSocket(null);
    };

    return () => {
      sock.close();
    };
  }, [place.id]);

  useEffect(() => {
    async function getChattingHistory() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/chat/chats?placeId=${place.id}&pageSize=30`);

      const data = await response.json();

      setComments(data);
    }

    if (place.id) {
      getChattingHistory();
    }
  }, [place.id]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const sendingMessage =
      replyingId === null
        ? {
            userId: 1,
            content: newComment,
          }
        : {
            userId: 1,
            content: newComment,
            originChatId: replyingId.toString(),
          };

    if (frontSocket) {
      frontSocket.send(JSON.stringify(sendingMessage));
    }
    setNewComment('');
    setReplyingId(null);
  };

  const handleReply = useCallback((num: string) => {
    setReplyingId(num);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  const toggleChatRoomList = () => {
    setShowChatRoomList((prev) => !prev);
  };

  return (
    <div className="w-[92%] h-[86%] ml-12 bg-chatRoomPurple rounded-lg relative">
      <div className="flex items-center p-4">
        <img
          src="/assets/HAT.svg"
          alt="User avatar"
          className="w-30 h-20 mr-4 ml-12 mt-6 mb-4"
        />
        <h2 className="text-3xl font-main mt-4">{place.name}</h2>
        <div className="flex-grow" />
        <button onClick={() => handleSavePlace(place.id)} className="mr-4">
          <img
            src={savedPlaces.includes(place.id) ? '/assets/bookmark-saved.svg' : '/assets/bookmark.svg'}
            alt="저장 버튼"
            className="w-20 h-16"
          />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-[90%] h-[400px] bg-gray-300 rounded-lg mb-4">
          <img src={place.imageUrl} alt="Place" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
      <div className="p-4 relative">
        <p className="text-right mb-4">12,542명이 소통하고 있어요!</p>
        <img
          src="/assets/Comment.svg"
          alt="comment-icon"
          className="w-10 h-10 absolute bottom-8 left-12 cursor-pointer"
          onClick={toggleChatRoomList}
        />
        {showChatRoomList && chatRoomData && <ChatRoomCard chatRoomData={chatRoomData} placeId={place.id} />}
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex items-center mb-2">
              <img src="/assets/HAT.svg" alt="User avatar" className="w-10 h-10 mr-2" />
              <div className="flex-grow bg-gray-100 p-2 rounded-lg">{comment.content}</div>
              <button className="ml-2" onClick={() => handleReply(comment.id)}>
                <img src="/assets/Reply.svg" alt="Reply" className="w-8 h-8 hover:cursor-pointer" />
              </button>
            </div>
            {comment.replies.map((reply) => (
              <ChatReply reply={reply} key={reply.id} />
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} id="message-input-area" className="h-[10%] bg-indigo-600 flex items-center px-[5%] py-[3%] mt-28">
        <div className="w-full flex justify-between gap-x-2 items-center">
          <input
            ref={commentInputRef}
            id="comment"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            aria-label="댓글을 입력하세요"
            autoComplete="off"
            className="grow rounded-sm p-4"
          />
          <button type="submit" className="h-full text-xl">
            전송
          </button>
        </div>
      </form>
    </div>
  );
}
