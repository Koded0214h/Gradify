import React, { createContext, useContext, useState, useEffect } from "react";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : { token: null, role: null, user: null };
  });

  // Ensure persistence and rehydration
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (auth && (auth.token || auth.user)) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  const login = async (email, password, role) => {
    if (useMock) {
      // Mock login - skip API call
      const mockAuth = {
        token: "mock-token-123",
        role,
        user: {
          name: "Test User",
          role,
          email,
        }
      };
      setAuth(mockAuth);
      return {
        success: true,
        user: mockAuth.user,
        token: mockAuth.token,
      };
    }

    // Otherwise, call real API
    // return await axios.post("/api/auth/login", { email, password, role });
    // For now, just use mock
    const mockAuth = {
      token: "mock-token-123",
      role,
      user: {
        name: "Test User",
        role,
        email,
      }
    };
    setAuth(mockAuth);
    return {
      success: true,
      user: mockAuth.user,
      token: mockAuth.token,
    };
  };

  const logout = () => {
    setAuth({ token: null, role: null, user: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ ...auth, user: auth.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 