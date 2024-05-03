import { Typography, Card, CardContent } from "@mui/material";
import { MessageResponse } from "../../api/models/MessageResponse";

export type MessageBubbleProps = {
  message: MessageResponse;
  groupFirst: boolean;
  groupLast: boolean;
  anchor: "left" | "right";
};

export default function MessageBubble({
  message,
  groupFirst,
  groupLast,
  anchor,
}: MessageBubbleProps) {
  return (
    <Card
      style={Object.assign(
        {},
        styles.container,
        groupFirst && anchor === "left" ? styles.groupFirstFromLeft : {},
        groupFirst && anchor === "right" ? styles.groupFirstFromRight : {},
        groupLast ? styles.groupLast : {}
      )}
    >
      <CardContent>
        <Typography variant="h6">
          {`${message.sender.firstName} ${message.sender.lastName}`}
          <Typography variant="caption" style={styles.date}>
            {formatDate(message.createdAt)}
          </Typography>
        </Typography>
        <Typography variant="body1">{message.content}</Typography>
      </CardContent>
    </Card>
  );
}

function formatDate(date: string) {
  // If today, return time
  if (new Date(date).toDateString() === new Date().toDateString()) {
    return new Date(date).toLocaleTimeString();
  }

  // Otherwise, return month and day and year
  return new Date(date).toLocaleDateString();
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  groupFirstFromRight: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
  },
  groupFirstFromLeft: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 16,
  },
  groupLast: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  date: {
    marginLeft: 8,
  },
};
