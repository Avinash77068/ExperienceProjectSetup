export default function useAuth() {
    const isAuthenticated = () => {
        return Boolean(localStorage.getItem("token"));
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        localStorage.removeItem("persist:root");
        // Clear any other auth-related localStorage items if needed
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('auth_') || key.startsWith('token_')) {
                localStorage.removeItem(key);
            }
        });
    };
    return {
        isAuthenticated,
        logout,
    };
}
