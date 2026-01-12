import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('omium_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login - replace with actual API call
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    localStorage.setItem('omium_user', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  const signup = (firstName, lastName, email, password) => {
    // Simulate signup - replace with actual API call
    const userData = { email, name: `${firstName} ${lastName}` };
    setUser(userData);
    localStorage.setItem('omium_user', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('omium_user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
