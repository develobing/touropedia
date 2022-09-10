import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getTours = createAsyncThunk(
  'tour/getTours',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTours();
      console.log('getTours() - response', response);

      return response.data;
    } catch (error) {
      console.log('getTours() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  'tour/getTour',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(_id);
      console.log('getTour() - response', response);

      return response.data;
    } catch (error) {
      console.log('getTour() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  'tour/getToursByUser',
  async (_userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(_userId);
      console.log('getToursByUser() - response', response);

      return response.data;
    } catch (error) {
      console.log('getToursByUser() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(data);
      console.log('createTour() - response', response);

      toast.success('Tour added Successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      console.log('createTour() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: 'tour',

  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    error: '',
    loading: false,
  },

  reducers: {
    clearError(state) {
      state.error = '';
    },
  },

  extraReducers: {
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { clearError } = tourSlice.actions;
export default tourSlice.reducer;
