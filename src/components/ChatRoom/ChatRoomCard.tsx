import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { chatProps } from '@_types/type';
import { ChatRoomData } from '@_types/type';
import Reply from '@components/ChatRoom/Reply';

interface ChatRoomCardProps {
  chatRoomData: ChatRoomData;
  placeId: string | undefined;
}

export default function ChatRoomCard({ chatRoomData, placeId }: ChatRoomCardProps) {
  const [newComment, setNewComment] = useState<string>('');
  const [frontSocket, setFrontSocket] = useState<WebSocket | null>(null);
  const [comments, setComments] = useState<chatProps[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sock = new SockJS(`http://172.233.70.162/chat/place/`, false, {
      server: placeId,
    });

    sock.onopen = async () => {
      console.log('connection opened!');
      setFrontSocket(sock);
    };

    sock.onmessage = (message) => {
      const parsedMessageData = JSON.parse(message.data);
      console.log(parsedMessageData);
      setComments((prev) => [parsedMessageData, ...prev]);
    };

    sock.onclose = () => {
      console.log('disconnected!');
      setFrontSocket(null);
    };

    return () => {
      sock.close();
    };
  }, [placeId]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const sendingMessage: chatProps = {
      id: '',
      userId: 1,
      content: newComment,
      originChatId: 'test',
      timeStamp: new Date(),
      replies: [],
    };

    if (frontSocket) {
      frontSocket.send(JSON.stringify(sendingMessage));
    }

    if (replyingTo !== null) {
      const newComments = comments.map((comment, index) => {
        if (index === replyingTo) {
          return {
            ...comment,
            replies: comment.replies ? [...comment.replies, sendingMessage] : [sendingMessage],
          };
        }
        return comment;
      });
      setComments(newComments);
    } else {
      setComments([sendingMessage, ...comments]);
    }

    setNewComment('');
    setReplyingTo(null);
  };

  const handleReply = (index: number) => {
    setReplyingTo(index);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  return (
    <div className="w-[42%] h-full">
      <div className="flex flex-col h-full bg-chatRoomPurple rounded-lg overflow-scroll scroll-box">
        <div className="w-full h-[10%] bg-indigo-600 text-white flex justify-start items-center pl-8">
          <h2 className="text-2xl font-bold font-main">{chatRoomData.name}</h2>
        </div>
        <div id="message-content-box" className="grow p-4">
          {comments.map((comment, index) => (
            <div key={index}>
              <div className="flex items-center mb-2">
                <img src="/assets/HAT.svg" alt="User avatar" className="w-10 h-10 mr-2" />
                <div className="flex-grow bg-gray-100 p-2 rounded-lg">
                  {comment.content}
                </div>
                <button className="ml-2" onClick={() => handleReply(index)}>
                  <img src="/assets/Reply.svg" alt="Reply" className="w-8 h-8 hover:cursor-pointer" />
                </button>
              </div>
              {comment.replies && comment.replies.map((reply, replyIndex) => (
                <Reply key={replyIndex} reply={reply}/>
              ))}
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className="h-[10%] bg-indigo-600 flex items-center px-[5%]">
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
