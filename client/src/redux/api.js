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

// Profile API
export const getProfile = ({ _id }) => API.get(`/profiles/${_id}`);
export const updateProfile = ({ _id, data }) =>
  API.put(`/profiles/${_id}`, data);

// Tour API
export const getTours = ({ page, searchQuery }) =>
  API.get(
    `/tours?${page ? `page=${page}` : ''}${
      searchQuery ? `&searchQuery=${searchQuery}` : ''
    }`
  );
export const getToursByTag = (tag) => API.get(`/tours/tags/${tag}`);
export const getRelatedTours = (_id, data) =>
  API.post(`/tours/${_id}/related-tours`, data);
export const getToursByUser = (_userId) => API.get(`/tours/users/${_userId}`);
export const getTour = (_id) => API.get(`/tours/${_id}`);
export const getAllTags = () => API.get('/tours/tags');
export const createTour = (tourData) => API.post('/tours', tourData);
export const updateTour = (_id, tourData) => API.put(`/tours/${_id}`, tourData);
export const deleteTour = (_id) => API.delete(`/tours/${_id}`);
export const likeTour = (_id) => API.put(`/tours/${_id}/likes`);
export const loadMoreTours = ({ skip, limit }) =>
  API.get(`/tours/load-more?skip=${skip}&limit=${limit}`);

// Upload API
export const uploadImage = (imageData) =>
  API.post('/uploads/images', imageData);
