import { authAPI } from "../../services/authService";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
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

export const logoutUser = () => (dispatch) => {

    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    dispatch(logout());
};
