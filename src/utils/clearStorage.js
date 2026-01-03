export const clearPersistedState = () => {
    localStorage.removeItem('persist:root');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    console.log('✅ Persisted state cleared');
};
