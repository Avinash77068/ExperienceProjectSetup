import { authAPI } from "../../services/authService";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} from "../slices/authSlice";
import Cookies from "cookies-js";
export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());

        const response = await authAPI.login(credentials);


        Cookies.set("token", response.access_token);

        Cookies.set("refresh_token", response.refresh_token, {
            expires: 7,    
        });

        dispatch(loginSuccess({
            user: {
                id: response.sub,
                email: credentials.email,
            }
        }));

        return { success: true, data: response };
    } catch (error) {
        const errorMessage = error?.message || error?.data?.message || "Login failed";
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
    }
};

export const logoutUser = () => (dispatch) => {

    Cookies.expire("token");
    Cookies.expire("refresh_token");
    dispatch(logout());
};
