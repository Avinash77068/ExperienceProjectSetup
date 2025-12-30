// src/store/thunks/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setUser, authError, authStart } from "../slices/authSlice";
import { login } from "../../services/authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { dispatch }) => {
    try {
      dispatch(authStart());
      const data = await login(payload);
      dispatch(setUser(data));

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error: any) {
      dispatch(authError(error?.message || "Login failed"));
      throw error;
    }
  }
);
