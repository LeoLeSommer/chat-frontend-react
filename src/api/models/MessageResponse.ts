import { UserSummaryResponse } from "./UserSummaryResponse";

export type MessageResponse = {
  id: number;
  content: string;
  sender: UserSummaryResponse;
  createdAt: string;
};
