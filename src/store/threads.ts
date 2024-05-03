import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { ThreadSummaryResponse } from "../api/models/ThreadSummaryResponse";
import { getThreads, createThread as apiCreateThread } from "../api/thread";
import { AuthStore } from "./auth";
import { PaginatedResponse } from "../api/models/PaginatedResponse";
import { CreateThreadBody } from "../api/models/CreateThreadBody";

export type ThreadsStore = {
  threads: ThreadSummaryResponse[];
  nextCursor: number | null;
  status: "idle" | "pending" | "resolved" | "rejected";
};

export const threadsStore: ThreadsStore = {
  threads: [],
  nextCursor: null,
  status: "idle",
};

const threadsSlice = createSlice({
  name: "auth",
  initialState: threadsStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(refetchThreads.fulfilled, (state, action) => {
      state.status = "resolved";
      state.threads = action.payload.data;
      state.nextCursor = action.payload.nextCursor;
    });

    builder.addCase(refetchThreads.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(refetchThreads.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchMoreThreads.fulfilled, (state, action) => {
      state.status = "resolved";
      state.threads = [...state.threads, ...action.payload.data];
      state.nextCursor = action.payload.nextCursor;

      // Remove duplicates
      state.threads = state.threads.filter(
        (value, index, self) =>
          self.findIndex((t) => t.id === value.id) === index
      );

      // Order by updated at
      state.threads.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    });

    builder.addCase(fetchMoreThreads.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(fetchMoreThreads.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(createThread.fulfilled, (state, action) => {
      state.status = "resolved";
      state.threads = [action.payload, ...state.threads];

      // Remove duplicates
      state.threads = state.threads.filter(
        (thread, index, self) =>
          index === self.findIndex((t) => t.id === thread.id)
      );

      // Order by updated at
      state.threads.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    });

    builder.addCase(createThread.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(createThread.pending, (state) => {
      state.status = "pending";
    });
  },
});

export default threadsSlice.reducer;

export const refetchThreads = createAsyncThunk<
  PaginatedResponse<ThreadSummaryResponse, number>,
  void,
  { state: { auth: AuthStore; threads: ThreadsStore } }
>("threads/refetchThreads", async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await getThreads(token as string, null, 10);

  return response;
});

export const fetchMoreThreads = createAsyncThunk<
  PaginatedResponse<ThreadSummaryResponse, number>,
  void,
  { state: { auth: AuthStore; threads: ThreadsStore } }
>("threads/fetchMoreThreads", async (_, { getState }) => {
  const token = getState().auth.token;
  const cursor = getState().threads.nextCursor;

  if (!cursor) {
    return {
      data: [],
      nextCursor: null,
    };
  } else {
    const response = await getThreads(token as string, cursor, 10);

    return response;
  }
});

export const createThread = createAsyncThunk<
  ThreadSummaryResponse,
  CreateThreadBody,
  { state: { auth: AuthStore; threads: ThreadsStore } }
>("threads/createThread", async (body: CreateThreadBody, { getState }) => {
  const token = getState().auth.token;
  const response = await apiCreateThread(token as string, body);

  return response;
});

export const selectThreads = createSelector(
  (state: { threads: ThreadsStore }) => state.threads,
  (threads) => threads.threads
);

export const selectStatus = createSelector(
  (state: { threads: ThreadsStore }) => state.threads,
  (threads) => threads.status
);
