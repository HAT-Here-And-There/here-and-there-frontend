import { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const ChatModal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white flex flex-col h-full w-full max-w-lg mx-auto rounded-lg z-50 ">
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-lg font-bold">전체 채팅 내역</h2>
          <button onClick={onClose}>
            <img src="/assets/close.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {children}
        </div>
        <div className="p-4 border-t border-gray-300">
          <form className="flex items-center">
            <img
              src="/assets/ProfileImage.svg"
              alt="User avatar"
              className="w-10 h-10 mr-2"
            />
            <input
              type="text"
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
