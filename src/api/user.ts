import api from "./index";
import { UserSummaryResponse } from "./models/UserSummaryResponse";

export async function getLoggedInUser(
  token: string
): Promise<UserSummaryResponse> {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getUserById(
  token: string,
  id: number
): Promise<UserSummaryResponse> {
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
