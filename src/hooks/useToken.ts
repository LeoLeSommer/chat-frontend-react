import { useSelector } from "react-redux";
import { selectToken } from "../store/auth";

export default function useToken() {
  return useSelector(selectToken) as string;
}
