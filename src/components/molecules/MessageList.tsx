import { useEffect, useMemo, useRef } from "react";
import { Avatar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import MessageBubble from "../molecules/MessageBubble";
import { MessageResponse } from "../../api/models/MessageResponse";
import useLoggedUser from "../../hooks/useLoggedUser";

export type MessageListProps = {
  messages: (MessageResponse & {
    isPending?: boolean;
  })[];
  status: "idle" | "pending" | "resolved" | "rejected";
  reset: () => Promise<void>;
  fetchMore: () => Promise<void>;
};

export default function MessageList({
  messages,
  status,
  reset,
  fetchMore,
}: MessageListProps) {
  const groupListRef = useRef<HTMLUListElement>(null);

  const loggedUser = useLoggedUser();
  const groupedMessage = useMemo(() => {
    const grouped: MessageResponse[][] = [];
    let currentGroup: MessageResponse[] = [];
    for (let i = 0; i < messages.length; i++) {
      if (i === 0) {
        currentGroup.push(messages[i]);
      } else {
        if (messages[i].sender.id === messages[i - 1].sender.id) {
          currentGroup.push(messages[i]);
        } else {
          grouped.push(currentGroup);
          currentGroup = [messages[i]];
        }
      }
    }
    grouped.push(currentGroup);
    return grouped;
  }, [messages]);

  // Scroll to the bottom of the list when the component is mounted
  useEffect(() => {
    if (groupListRef.current && status === "resolved") {
      groupListRef.current.scrollTop = groupListRef.current.scrollHeight;
    }
  }, [status]);

  // If a new message is added, scroll to the bottom of the list
  useEffect(() => {
    if (groupListRef.current) {
      groupListRef.current.scrollTop = groupListRef.current.scrollHeight;
    }
  }, [groupedMessage]);

  // Fetch more messages when the user scrolls to the top of the list
  useEffect(() => {
    const current = groupListRef.current;
    const handleScroll = () => {
      if (current) {
        const isAtTop = current.scrollTop === 0;
        if (isAtTop && status === "idle") {
          fetchMore();
        }
      }
    };

    if (current) {
      current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [status, fetchMore]);

  return (
    <ul ref={groupListRef} style={styles.groupList}>
      {messages.length === 0 ? (
        <Typography>Pas de messages</Typography>
      ) : (
        groupedMessage.map((group, index) => (
          <div
            key={index}
            style={
              group[0].sender.id === loggedUser.id
                ? styles.meChatBubble
                : styles.chatBubble
            }
          >
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {`${group[0].sender.firstName[0]}${group[0].sender.lastName[0]}`}
            </Avatar>
            <div style={styles.messageList}>
              {group.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  groupFirst={index === 0}
                  groupLast={index === group.length - 1}
                  anchor={
                    group[0].sender.id === loggedUser.id ? "right" : "left"
                  }
                />
              ))}
            </div>
          </div>
        ))
      )}
    </ul>
  );
}

const styles: Record<string, React.CSSProperties> = {
  groupList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflow: "auto",
    padding: 24,
    margin: 0,
  },
  chatBubble: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  meChatBubble: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 8,
  },
  messageList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
};
