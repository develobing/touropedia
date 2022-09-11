import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:5005';
const API = axios.create({ baseURL: API_HOST });
API.interceptors.request.use((req) => {
  const storedUser = JSON.parse(localStorage.getItem('profile'));

  if (storedUser) {
    const token = storedUser.token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// User API
export const signIn = (payload) => API.post('/users/signin', payload);
export const googleSignin = (payload) =>
  API.post('/users/google-signin', payload);
export const signUp = (payload) => API.post('/users/signup', payload);

// Tour API
export const getTours = (page) => API.get(`/tours?page=${page}`);
export const getToursBySearch = (searchQuery) =>
  API.get(`/tours/search?searchQuery=${searchQuery}`);
export const getToursByTag = (tag) => API.get(`/tours/tags/${tag}`);
export const getRelatedTours = (_id, data) =>
  API.post(`/tours/${_id}/related-tours`, data);
export const getToursByUser = (_userId) => API.get(`/tours/users/${_userId}`);
export const getTour = (_id) => API.get(`/tours/${_id}`);
export const createTour = (tourData) => API.post('/tours', tourData);
export const updateTour = (_id, tourData) => API.put(`/tours/${_id}`, tourData);
export const deleteTour = (_id) => API.delete(`/tours/${_id}`);
export const likeTour = (_id) => API.put(`/tours/${_id}/likes`);

// Upload API
export const uploadImage = (imageData) =>
  API.post('/uploads/images', imageData);
