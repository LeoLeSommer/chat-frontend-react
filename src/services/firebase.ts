import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import configurations from "../configurations";

const app = initializeApp(configurations.firebaseConfig);

export async function firebaseSignInWithEmailAndPassword(
  email: string,
  password: string
) {
  const auth = getAuth(app);
  const result = await createUserWithEmailAndPassword(auth, email, password);

  return result.user.getIdToken();
}

export async function firebaseSignInWithGoogle() {
  const auth = getAuth(app);
  const result = await signInWithPopup(auth, new GoogleAuthProvider());

  return result.user.getIdToken();
}

export function firebaseSignOut() {
  const auth = getAuth(app);
  return auth.signOut();
}
