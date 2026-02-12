import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* Attach token to every request */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* Global error handling */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      /* Clear stored auth – React AuthContext / ProtectedRoute will
         handle the redirect to the correct login page.
         Do NOT use window.location.href here; a hard redirect
         breaks the React lifecycle and leaves pending async
         operations in a bad state. */
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
    }
    return Promise.reject(error);
  }
);

export default API;
