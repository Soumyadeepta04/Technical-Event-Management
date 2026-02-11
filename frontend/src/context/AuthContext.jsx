import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import API from '../services/api.js';
import { AUTH } from '../services/endpoints.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  /* Initialise user from localStorage so we never flash "Loading…" on navigation */
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  /* loading is only true on the very first mount while we verify the token */
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));
  const didVerify = useRef(false);

  /* Verify token ONLY once on initial mount */
  useEffect(() => {
    if (didVerify.current) return;
    didVerify.current = true;

    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await API.get(AUTH.ME);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch {
        /* Only clear if the server explicitly rejected the token (401) */
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await API.post(AUTH.LOGIN, credentials);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (formData) => {
    const { data } = await API.post(AUTH.REGISTER, formData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
