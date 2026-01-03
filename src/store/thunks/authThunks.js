import { authAPI } from "../../services/authService";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
} from "../slices/authSlice";

export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());

        const response = await authAPI.login(credentials);

        localStorage.setItem("token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);

        dispatch(loginSuccess({
            user: {
                id: response.sub,
                email: credentials.email,
            },
            token: response.access_token,
        }));

        return { success: true, data: response };
    } catch (error) {
        const errorMessage = error?.message || error?.data?.message || "Login failed";
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(registerStart());

        const response = await authAPI.register(userData);

        localStorage.setItem("token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);

        dispatch(registerSuccess({
            user: {
                id: response.sub,
                email: userData.email,
            },
            token: response.access_token,
        }));

        return { success: true, data: response };
    } catch (error) {
        const errorMessage = error?.message || error?.data?.message || "Registration failed";
        dispatch(registerFailure(errorMessage));
        return { success: false, error: errorMessage };
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(logoutStart());

        await authAPI.logout();

        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");

        dispatch(logoutSuccess());

        return { success: true };
    } catch (error) {
        const errorMessage = error?.message || "Logout failed";
        dispatch(logoutFailure(errorMessage));

        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        dispatch(logoutSuccess());

        return { success: false, error: errorMessage };
    }
};

export const refreshUserToken = (refreshToken) => async (dispatch) => {
    try {
        const response = await authAPI.refreshToken(refreshToken);

        localStorage.setItem("token", response.access_token);

        dispatch(loginSuccess({
            user: {
                id: response.sub,
            },
            token: response.access_token,
        }));

        return { success: true, data: response };
    } catch (error) {
        dispatch(logoutSuccess());
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        return { success: false, error: error?.message };
    }
};

export const fetchUserProfile = () => async (dispatch) => {
    try {
        const data = await authAPI.getProfile();

        dispatch(loginSuccess({
            user: data,
            token: localStorage.getItem("token"),
        }));

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error?.message };
    }
};
