import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(data);
      console.log('login() - response', response);

      toast.success('Login Successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      console.log('login() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignin = createAsyncThunk(
  'auth/googleSignin',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignin(data);
      console.log('googleSignin() - response', response);

      toast.success('Google login Successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      console.log('googleSignin() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(data);
      console.log('register() - response', response);

      toast.success('Register Successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      console.log('register() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: null,
    error: '',
    loading: false,
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    removeUser(state) {
      localStorage.removeItem('profile');
      state.user = null;
    },

    clearError(state) {
      state.error = '';
    },
  },

  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [googleSignin.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [googleSignin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, removeUser, clearError } = authSlice.actions;
export default authSlice.reducer;
