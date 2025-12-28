export default function useAuth() {
    const isAuthenticated = () => {
        return Boolean(localStorage.getItem("token"));
    };

    return {
        isAuthenticated,
    };
}
