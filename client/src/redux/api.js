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
export const getTours = () => API.get('/tours');
export const getTour = (_id) => API.get(`/tours/${_id}`);
export const getToursByUser = (_userId) => API.get(`/tours/users/${_userId}`);
export const createTour = (tourData) => API.post('/tours', tourData);

// Upload API
export const uploadImage = (imageData) =>
  API.post('/uploads/images', imageData);
