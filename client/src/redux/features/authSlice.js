import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const respnose = await api.signIn(formValue);
      toast.success('Login Successfully');
      navigate('/');
      return respnose.data;
    } catch (error) {
      console.log('login() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const respnose = await api.signUp(formValue);
      toast.success('Register Successfully');
      navigate('/');
      return respnose.data;
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

export default authSlice.reducer;
