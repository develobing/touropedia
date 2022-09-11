import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getProfile = createAsyncThunk(
  'tour/getProfile',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.getProfile({ _id });
      console.log('getProfile() - response', response);

      return response.data;
    } catch (error) {
      console.log('getProfile() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'tour/updateProfile',
  async ({ _id, data }, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile({ _id, data });
      console.log('updateProfile() - response', response);

      return response.data;
    } catch (error) {
      console.log('updateProfile() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',

  initialState: {
    userDetail: null,
    error: '',
    loading: false,
  },

  extraReducers: {
    [getProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default profileSlice.reducer;
