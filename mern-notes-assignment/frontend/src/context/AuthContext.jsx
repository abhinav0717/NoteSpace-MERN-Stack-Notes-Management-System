
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing login session
  useEffect(() => {
    const token = localStorage.getItem('notes_token');

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem('notes_token');
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Save login session
  const saveSession = (data) => {
    localStorage.setItem('notes_token', data.token);
    setUser(data.user);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('notes_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        saveSession,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom authentication hook
export const useAuth = () => {
  return useContext(AuthContext);
};
