import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const loading = false;

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        const { user_details } = response.data; // Check backend response structure
        // Backend: user_details: { id, user_name, email, accessToken } linked to line 86 in AuthController.js
        // Wait, line 86 says message structure.
        // Line 86: user_details: { ... }
        // line 90: accessToken inside user_details.

        // Actually looking at AuthController.js:
        // res.status(200).json({ success: true, message: "Login Successful", user_details: { ... , accessToken: ... } })

        const tokenToStore = user_details.accessToken;
        setToken(tokenToStore);
        setUser(user_details);
        localStorage.setItem("token", tokenToStore);
        localStorage.setItem("user", JSON.stringify(user_details));
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.error?.message || "Login failed",
      };
    }
  };

  const register = async (user_name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        user_name,
        email,
        password,
      });
      // Backend returns 201 and message. No token/user details in response as per line 41 commented out.
      // So user has to login after register.
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: error.response?.data?.error?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
