import api from "./index";
import { CreateThreadBody } from "./models/CreateThreadBody";
import { MessageResponse } from "./models/MessageResponse";
import { PaginatedResponse } from "./models/PaginatedResponse";
import { SendMessageBody } from "./models/SendMessageBody";
import { ThreadSummaryResponse } from "./models/ThreadSummaryResponse";

export async function getThreads(
  token: string,
  cursor: number | null,
  limit: number
): Promise<PaginatedResponse<ThreadSummaryResponse, number>> {
  const response = await api.get("/threads", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      cursor,
      limit,
    },
  });

  return response.data;
}

export async function createThread(
  token: string,
  body: CreateThreadBody
): Promise<ThreadSummaryResponse> {
  const response = await api.post("/threads", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function getMessages(
  token: string,
  threadId: number,
  cursor: number | null,
  limit: number
): Promise<PaginatedResponse<MessageResponse, number>> {
  const response = await api.get(`/threads/${threadId}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      cursor,
      limit,
    },
  });

  return response.data;
}

export async function sendMessage(
  token: string,
  threadId: number,
  body: SendMessageBody
): Promise<MessageResponse> {
  const response = await api.post(`/threads/${threadId}/messages`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
