import { useState, useRef, useEffect } from 'react';
import { chatProps } from '@_types/type';

interface ModalProps {
  onClose: () => void;
  comments: chatProps[];
  onCommentSubmit: (newComment: string, replyingId: string | null) => void;
  onReply: (commentId: string) => void;
  replyingId: string | null;
}

const ChatModal = ({
  onClose,
  comments,
  onCommentSubmit,
  onReply,
  replyingId,
}: ModalProps) => {
  const [newModalComment, setNewModalComment] = useState<string>('');
  const modalCommentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (replyingId && modalCommentInputRef.current) {
      modalCommentInputRef.current.focus();
    }
  }, [replyingId]);

  const handleModalCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCommentSubmit(newModalComment, replyingId);
    setNewModalComment('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white flex flex-col h-[90%] w-full max-w-lg mx-auto rounded-lg z-50">
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-lg font-bold">전체 채팅 내역</h2>
          <button onClick={onClose}>
            <img src="/assets/close.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto bg-chatModalPurple">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex items-center mb-4">
                <img
                  src="/assets/HAT.svg"
                  alt="User avatar"
                  className="w-10 h-10 mr-2"
                />
                <div className="flex-grow bg-gray-100 p-2 rounded-lg">
                  {comment.content}
                </div>
                <button className="ml-2" onClick={() => onReply(comment.id)}>
                  <img
                    src="/assets/Reply.svg"
                    alt="Reply"
                    className="w-8 h-8 hover:cursor-pointer"
                  />
                </button>
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-center mt-4">
                      <img
                        src="/assets/HAT.svg"
                        alt="User avatar"
                        className="w-8 h-8 mr-2"
                      />
                      <div className="flex-grow bg-gray-200 p-2 rounded-lg">
                        {reply.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-300">
          <form
            className="flex items-center"
            onSubmit={handleModalCommentSubmit}
          >
            <img
              src="/assets/ProfileImage.svg"
              alt="User avatar"
              className="w-10 h-10 mr-2"
            />
            <input
              ref={modalCommentInputRef}
              type="text"
              value={newModalComment}
              onChange={(e) => setNewModalComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-grow p-2 border rounded-lg"
            />
            <button type="submit" className="ml-2 text-textPurple">
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
