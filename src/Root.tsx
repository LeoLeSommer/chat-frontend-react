import { useEffect } from "react";
import { useSelector } from "react-redux";
import SignInPage from "./components/pages/SignInPage";
import {
  selectIsRegistered,
  selectStatus,
  signInWithStoredToken,
} from "./store/auth";
import { useAppDispatch } from "./store";
import LoginPage from "./components/pages/LoginPage";
import LoadingPage from "./components/pages/LoadingPage";
import ChatPage from "./components/pages/ChatPage";

export default function Root() {
  const dispatch = useAppDispatch();
  const isSignedIn = useSelector(selectIsRegistered);
  const authStatus = useSelector(selectStatus);

  // Check if there is a stored token and if it is still valid
  // If it is, then the user is already signed in
  useEffect(() => {
    dispatch(signInWithStoredToken());
  }, [dispatch]);

  switch (authStatus) {
    case "pending":
      return <LoadingPage />;
    case "resolved":
      return isSignedIn ? <ChatPage /> : <SignInPage />;
    default:
      return <LoginPage />;
  }
}
