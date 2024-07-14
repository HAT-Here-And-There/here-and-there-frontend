import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import {
  chatProps,
  commingMessageDataProp,
  PlaceChatProps,
} from '@_types/type';
import { fetchSavedPlaces } from '@utils/fetchFunctions';
import ChatModal from '@components/travel-plan-all/chatModal';

export default function PlaceChat({ place }: PlaceChatProps) {
  const [newComment, setNewComment] = useState<string>('');
  const [frontSocket, setFrontSocket] = useState<WebSocket | null>(null);
  const [comments, setComments] = useState<chatProps[]>([]);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<chatProps[]>(comments);

  useEffect(() => {
    fetchSavedPlaces()
      .then((data) => {
        const savedPlaceIds = data.map((place: { id: string }) => place.id);
        setSavedPlaces(savedPlaceIds);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    commentsRef.current = comments;
  }, [comments]);

  useEffect(() => {
    const sock = new SockJS(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/chat/place/`,
      false,
      {
        server: place.id,
      }
    );

    sock.onopen = async () => {
      setFrontSocket(sock);
    };

    sock.onmessage = (message) => {
      const parsedMessageData: commingMessageDataProp = JSON.parse(
        message.data
      );
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
                replies: element.replies
                  ? [...element.replies, newData]
                  : [newData],
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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/chat/chats?placeId=${
          place.id
        }&pageSize=30`
      );

      const data = await response.json();

      setComments(data);
    }

    if (place.id) {
      getChattingHistory();
    }
  }, [place.id]);

  const handleCommentSubmit = (
    newComment: string,
    replyingId: string | null
  ) => {
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

  const handleSavePlace = async (placeId: string) => {
    const isSaved = savedPlaces.includes(placeId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`,
        {
          method: isSaved ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: placeId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          isSaved ? '저장된 장소 삭제하기 실패' : '장소 저장 실패'
        );
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

  const handleCommentIconClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-chatRoomPurple rounded-lg">
      <div className="flex items-center mb-4">
        <img
          src="/assets/HAT.svg"
          alt="User avatar"
          className="w-30 h-20 mr-4 ml-12"
        />
        <h2 className="text-3xl font-main">{place.name}</h2>
        <div className="flex-grow" />
        <button onClick={() => handleSavePlace(place.id)} className="mr-4">
          <img
            src={
              savedPlaces.includes(place.id)
                ? '/assets/bookmark-saved.svg'
                : '/assets/bookmark.svg'
            }
            alt="저장 버튼"
            className="w-20 h-16"
          />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <div className="w-[90%] h-[400px] bg-gray-300 rounded-lg">
          <img
            src={place.imageUrl}
            alt="Place"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col w-[90%] mx-auto flex-grow">
        <div className="flex-grow p-4 relative overflow-y-auto">
          <p className="text-right">12,542명이 소통하고 있어요!</p>
          <img
            src="/assets/Comment.svg"
            alt="comment-icon"
            className="w-10 h-10 -mt-9 cursor-pointer"
            onClick={handleCommentIconClick}
          />
          {comments.length > 0 && (
            <div key={comments[0].id}>
              <div className="flex items-center mt-10 ">
                <div className="flex-grow bg-gray-100 opacity-80 p-4 rounded-lg">
                  {comments[0].content}
                </div>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleCommentSubmit(newComment, replyingId);
          }}
          className="flex items-center px-4 py-4 bg-indigo-600 rounded-lg"
        >
          <img
            src="/assets/ProfileImage.svg"
            alt="User avatar"
            className="w-10 h-10 mr-2"
          />
          <input
            ref={commentInputRef}
            id="comment"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            aria-label="댓글을 입력하세요"
            autoComplete="off"
            className="flex-grow p-2 rounded-lg"
          />
          <button type="submit" className="ml-2 text-white text-xl">
            전송
          </button>
        </form>
      </div>

      {isModalOpen && (
        <ChatModal
          onClose={closeModal}
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
          onReply={handleReply}
          replyingId={replyingId}
        />
      )}
    </div>
  );
}
