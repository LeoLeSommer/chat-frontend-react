import { useSelector } from "react-redux";
import { selectLoggedUser } from "../store/auth";
import { UserSummaryResponse } from "../api/models/UserSummaryResponse";

export default function useLoggedUser() {
  return useSelector(selectLoggedUser) as UserSummaryResponse;
}
