import { useCallback, useEffect, useReducer } from "react";
import { io } from "socket.io-client";
import { MessageResponse } from "../api/models/MessageResponse";
import { PaginatedResponse } from "../api/models/PaginatedResponse";
import { SendMessageBody } from "../api/models/SendMessageBody";
import { getMessages, sendMessage as apiSendMessage } from "../api/thread";
import useToken from "./useToken";
import useLoggedUser from "./useLoggedUser";
import { UserSummaryResponse } from "../api/models/UserSummaryResponse";
import configurations from "../configurations";

type State = {
  messages: (MessageResponse & {
    isPending?: boolean;
  })[];
  status: "idle" | "pending" | "resolved" | "rejected";
  nextCursor: number | null;
};

type Action =
  | {
      type: "reset";
      status: "pending";
    }
  | {
      type: "reset";
      status: "resolved";
      payload: PaginatedResponse<MessageResponse, number>;
    }
  | {
      type: "reset";
      status: "rejected";
    }
  | {
      type: "fetchMore";
      status: "pending";
    }
  | {
      type: "fetchMore";
      status: "resolved";
      payload: PaginatedResponse<MessageResponse, number>;
    }
  | {
      type: "fetchMore";
      status: "rejected";
    }
  | {
      type: "sendMessage";
      status: "pending";
      payload: SendMessageBody;
      sender: UserSummaryResponse;
    }
  | { type: "sendMessage"; status: "resolved"; payload: MessageResponse }
  | { type: "sendMessage"; status: "rejected" }
  | { type: "messageReceived"; payload: MessageResponse };

const initialState: State = {
  messages: [],
  status: "idle",
  nextCursor: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "reset":
      return {
        ...state,
        status: action.status,
        messages:
          action.status === "resolved"
            ? orderByDate(action.payload.data).map((message) => ({
                ...message,
                isPending: false,
              }))
            : [],
        nextCursor:
          action.status === "resolved" ? action.payload.nextCursor : 0,
      };
    case "fetchMore":
      return {
        ...state,
        status: action.status,
        messages:
          action.status === "resolved"
            ? [
                ...state.messages,
                ...orderByDate(action.payload.data).map((message) => ({
                  ...message,
                  isPending: false,
                })),
              ]
            : state.messages,
        nextCursor:
          action.status === "resolved"
            ? action.payload.nextCursor
            : state.nextCursor,
      };
    case "sendMessage":
      return {
        ...state,
        status: action.status,
        messages:
          action.status === "resolved"
            ? state.messages
                .filter((message) => message.id !== action.payload.id)
                .concat(action.payload)
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
            : state.messages,
      };
    case "messageReceived":
      return {
        ...state,
        messages: state.messages
          .filter((message) => message.id !== action.payload.id)
          .concat(action.payload)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          ),
      };

    default:
      return state;
  }
}

export default function useMessageList(threadId: number) {
  const token = useToken();
  const loggedUser = useLoggedUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  const reset = useCallback(async () => {
    dispatch({ type: "reset", status: "pending" });
    try {
      const response = await getMessages(token, threadId, null, 10);
      dispatch({ type: "reset", status: "resolved", payload: response });
    } catch (error) {
      dispatch({ type: "reset", status: "rejected" });
    }
  }, [token, threadId]);

  const fetchMore = useCallback(async () => {
    dispatch({ type: "fetchMore", status: "pending" });
    try {
      const response = await getMessages(token, threadId, state.nextCursor, 10);
      dispatch({ type: "fetchMore", status: "resolved", payload: response });
    } catch (error) {
      dispatch({ type: "fetchMore", status: "rejected" });
    }
  }, [token, threadId, state.nextCursor]);

  const sendMessage = useCallback(
    async (body: SendMessageBody) => {
      dispatch({
        type: "sendMessage",
        status: "pending",
        payload: body,
        sender: loggedUser,
      });
      try {
        const response = await apiSendMessage(token, threadId, body);
        dispatch({
          type: "sendMessage",
          status: "resolved",
          payload: response,
        });
      } catch (error) {
        dispatch({ type: "sendMessage", status: "rejected" });
      }
    },
    [token, threadId, loggedUser]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const socket = io(
      `${configurations.baseWebSocketUrl}/threads?token=abc123`,
      {
        transports: ["polling", "websocket"],
      }
    );

    socket.on("new_message", (message: MessageResponse) => {
      dispatch({ type: "messageReceived", payload: message });
    });

    return () => {
      socket.disconnect();
    };
  }, [token, threadId]);

  return { ...state, reset, fetchMore, sendMessage };
}

function orderByDate(array: MessageResponse[]) {
  return array.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}
