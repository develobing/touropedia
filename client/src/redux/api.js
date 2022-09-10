import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5005' });

export const signIn = (payload) => API.post('/users/signin', payload);
export const googleSignin = (payload) =>
  API.post('/users/google-signin', payload);
export const signUp = (payload) => API.post('/users/signup', payload);
