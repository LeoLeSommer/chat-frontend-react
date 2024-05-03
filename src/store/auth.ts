import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RegisterBody } from "../api/models/RegisterBody";
import { isRegistered, register as apiRegister } from "../api/auth";
import { firebaseSignInWithGoogle } from "../services/firebase";
import { UserSummaryResponse } from "../api/models/UserSummaryResponse";
import { getLoggedInUser } from "../api/user";

export type AuthStore = {
  loggedUser: UserSummaryResponse | null;
  token: string | null;
  isRegistered: boolean;
  status: "idle" | "pending" | "resolved" | "rejected";
};

export const authStore: AuthStore = {
  loggedUser: null,
  token: null,
  isRegistered: false,
  status: "pending",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInWithStoredToken.fulfilled, (state, action) => {
      state.status = "resolved";
      state.token = action.payload.token;
      state.isRegistered = action.payload.isRegistered;
      state.loggedUser = action.payload.loggedUser;
    });

    builder.addCase(signInWithStoredToken.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(signInWithStoredToken.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.status = "resolved";
      state.token = action.payload.token;
      state.isRegistered = action.payload.isRegistered;
      state.loggedUser = action.payload.loggedUser;
    });

    builder.addCase(signInWithGoogle.rejected, (state, err) => {
      state.status = "rejected";
    });

    builder.addCase(signInWithGoogle.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "resolved";
      state.isRegistered = true;
      state.loggedUser = action.payload;
    });

    builder.addCase(register.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(register.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.status = "idle";
      state.token = null;
      state.isRegistered = false;
    });

    builder.addCase(signOut.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(signOut.pending, (state) => {
      state.status = "pending";
    });
  },
});

export default authSlice.reducer;

export const signInWithStoredToken = createAsyncThunk(
  "auth/signInWithStoredToken",
  async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const isAlreadyRegistered = await isRegistered(token);

    return {
      token,
      isRegistered: isAlreadyRegistered,
      loggedUser: isAlreadyRegistered ? await getLoggedInUser(token) : null,
    };
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async () => {
    const token = await firebaseSignInWithGoogle();
    const isAlreadyRegistered = await isRegistered(token);

    // Store the token in the local storage
    localStorage.setItem("token", token);

    return {
      token,
      isRegistered: isAlreadyRegistered,
      loggedUser: isAlreadyRegistered ? await getLoggedInUser(token) : null,
    };
  }
);

export const register = createAsyncThunk<
  UserSummaryResponse,
  RegisterBody,
  { state: { auth: AuthStore } }
>("auth/register", async (body: RegisterBody, { getState }) => {
  const token = getState().auth.token;
  return await apiRegister(token as string, body);
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  localStorage.removeItem("token");
});

export const selectLoggedUser = createSelector(
  (state: { auth: AuthStore }) => state.auth,
  (auth) => auth.loggedUser
);

export const selectToken = createSelector(
  (state: { auth: AuthStore }) => state.auth,
  (auth) => auth.token
);

export const selectIsRegistered = createSelector(
  (state: { auth: AuthStore }) => state.auth,
  (auth) => auth.isRegistered
);

export const selectStatus = createSelector(
  (state: { auth: AuthStore }) => state.auth,
  (auth) => auth.status
);
