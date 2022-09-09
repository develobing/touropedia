import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5005' });

export const signIn = (formDate) => API.post('/users/signin', formDate);
export const signUp = (formDate) => API.post('/users/signup', formDate);
