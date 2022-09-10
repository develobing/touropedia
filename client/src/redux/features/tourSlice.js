import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getTours = createAsyncThunk(
  'tour/getTours',
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const respnose = await api.getTours(data);
      navigate('/');
      return respnose.data;
    } catch (error) {
      console.log('getTours() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const respnose = await api.createTour(data);
      toast.success('Tour added Successfully');
      navigate('/');
      return respnose.data;
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
