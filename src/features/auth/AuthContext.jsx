
import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [AuthUser, setAuthUser] = useState(null);

  
  const login = (userData) => {
    setAuthUser(userData);
  };

  const logout = () => {
    setAuthUser(null);
  };

  const isLoggedIn = !!AuthUser;

  return (
    <AuthContext.Provider value={{ AuthUser, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);