import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { chatProps, commingMessageDataProp } from '@_types/type';
import { ChatRoomData } from '@_types/type';
import ChatReply from '@components/ChatRoom/ChatReply';

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
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<chatProps[]>(comments);

  useEffect(() => {
    commentsRef.current = comments;
  }, [comments]);

  useEffect(() => {
    const sock = new SockJS(`http://172.233.70.162/chat/place/`, false, {
      server: placeId,
    });

    sock.onopen = async () => {
      // console.log('connection opened!');
      setFrontSocket(sock);
    };

    sock.onmessage = (message) => {
      const parsedMessageData: commingMessageDataProp = JSON.parse(
        message.data
      );
      // 답글이 아닌 메시지인 경우도 있고, 답글인 메시지도 있음
      // 답글인 경우 : 가장 위로 올려버리면 됨
      const newData: chatProps = {
        id: parsedMessageData.id,
        userId: parsedMessageData.userId,
        content: parsedMessageData.content,
        timeStamp: parsedMessageData.timeStamp,
        replies: [],
      };

      if (parsedMessageData.originChatId === null) {
        setComments((prev) => {
          const updatingComments = [newData, ...prev];
          commentsRef.current = updatingComments;
          return updatingComments;
        });
      } else {
        setComments((prev) => {
          const updatingComments = prev.map((element) => {
            if (element.id === parsedMessageData.originChatId) {
              return {
                ...element,
                replies: element.replies
                  ? [...element.replies, newData]
                  : [newData],
              };
            } else {
              return element;
            }
          });

          commentsRef.current = updatingComments;
          return updatingComments;
        });
      }
    };

    sock.onclose = () => {
      // console.log('disconnected!');
      setFrontSocket(null);
    };

    return () => {
      sock.close();
    };
  }, []);

  useEffect(() => {
    async function getChattingHistory() {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }/chat/chats?placeId=${placeId}&pageSize=30`
      );

      const data = await response.json();

      setComments(data);
    }

    getChattingHistory();
  }, []);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const sendingMessage =
      replyingId === null
        ? {
            userId: 1,
            content: newComment,
            // originChatId: '6652f868bf7bec59262e42e9',
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

  // 답글 달기 이미지를 클릭하면 replyingId 상태가 그것으로 바뀌고 input으로 포커싱 됨
  const handleReply = useCallback((num: string) => {
    setReplyingId(num);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-[45%] h-full">
      <div className="flex flex-col h-full bg-chatRoomPurple rounded-lg scroll-box">
        <div
          className="w-full py-[4%] bg-indigo-600 text-white flex justify-start items-center pl-8"
          id="chat-input-header"
        >
          <h2 className="text-2xl font-bold font-main">{chatRoomData.name}</h2>
        </div>
        <div
          id="message-content-box"
          className="grow p-4 overflow-scroll scroll-box"
        >
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex items-center mb-2">
                <img
                  src="/assets/HAT.svg"
                  alt="User avatar"
                  className="w-10 h-10 mr-2"
                />
                <div className="flex-grow bg-gray-100 p-2 rounded-lg">
                  {comment.content}
                </div>
                <button
                  className="ml-2"
                  onClick={() => handleReply(comment.id)}
                >
                  <img
                    src="/assets/Reply.svg"
                    alt="Reply"
                    className="w-8 h-8 hover:cursor-pointer"
                  />
                </button>
              </div>
              {comment.replies.map((reply) => {
                return <ChatReply reply={reply} key={reply.id} />;
              })}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleCommentSubmit}
          id="message-input-area"
          className="h-[10%] bg-indigo-600 flex items-center px-[5%] py-[3%]"
        >
          <div className="w-full flex justify-between gap-x-2 items-center">
            <input
              ref={commentInputRef} // Ref 추가
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
