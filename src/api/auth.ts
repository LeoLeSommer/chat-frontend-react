import api from "./index";
import { RegisterBody } from "./models/RegisterBody";
import { UserSummaryResponse } from "./models/UserSummaryResponse";

export async function isRegistered(token: string): Promise<boolean> {
  const response = await api.get("/auth/is-registered", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function register(
  token: string,
  body: RegisterBody
): Promise<UserSummaryResponse> {
  const response = await api.post("/auth/register", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
