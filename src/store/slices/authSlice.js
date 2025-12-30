// src/store/slices/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: [],
    reducers: {
        authStart(state) {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        },

        setUser(state, action) {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload;
        },

        authError(state, action) {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },

        logout() {
            return initialState;
        },
    },
});

export const { authStart, setUser, authError, logout } = authSlice.actions;
export default authSlice.reducer;
