import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

// Add response interceptor to handle network errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // Network error or timeout
      error.code = 'ERR_NETWORK';
    }
    return Promise.reject(error);
  }
);

// User registration function
export const registerUser = (userData) => {
  return api.post('/users/register', userData);
};

// Get all users (for admin)
export const getAllUsers = () => {
  return api.get('/users');
};

// Login user function
export const loginUser = (credentials) => {
  return api.post('/users/login', credentials);
};

// Get user's favorite movies
export const getUserFavorites = () => {
  return api.get('/user/favorites');
};

// Add a movie to user's favorites
export const addToFavorites = (movieId) => {
  return api.post('/user/favorites', { movieId });
};

// Remove a movie from user's favorites
export const removeFromFavorites = (movieId) => {
  return api.delete(`/user/favorites/${movieId}`);
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
