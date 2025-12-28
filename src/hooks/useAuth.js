export default function useAuth() {
    const isAuthenticated = () => {
        return Boolean(localStorage.getItem("token"));
    };
    const logout = () => {
        localStorage.removeItem("token");
        // optional: aur bhi user data ho to clear kar do
        localStorage.removeItem("token");
    };
    return {
        isAuthenticated,
        logout,
    };
}
