import { chatProps } from '@_types/type';

interface ReplyProps {
  reply: chatProps;
}

export default function ChatReply({ reply }: ReplyProps) {
  return (
    <div id="CardReply" className="flex items-center ml-10 mb-2">
      <img src="/assets/HAT.svg" alt="User avatar" className="w-8 h-8 mr-2" />
      <div className="flex-grow bg-gray-100 p-2 rounded-lg">
        {reply.content}
      </div>
    </div>
  );
}
