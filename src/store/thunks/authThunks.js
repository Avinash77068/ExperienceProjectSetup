import { authAPI } from "../../services/authService";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
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






