import { useSelector } from "react-redux";
import { authAPI } from "../services/authService";

export default function useAuth() {
    const auth = useSelector((state) => state.auth);

    const isAuthenticated = () => {
        return auth.isAuthenticated;
    };
    const logout = () => {
        return authAPI.logout();
    };
   
    return {
        ...auth, // Spread all auth state
        isAuthenticated,
        logout,
    };
}
