import MessageList from "../molecules/MessageList";
import SendMessageForm from "../molecules/SendMessageForm";
import useMessageList from "../../hooks/useMessageList";

export type ThreadChatProps = {
  threadId: number;
};

export default function ThreadChat({ threadId }: ThreadChatProps) {
  const { messages, status, reset, fetchMore, sendMessage } =
    useMessageList(threadId);

  return (
    <>
      <MessageList
        messages={messages}
        status={status}
        reset={reset}
        fetchMore={fetchMore}
      />
      <SendMessageForm sendMessage={sendMessage} />
    </>
  );
}
