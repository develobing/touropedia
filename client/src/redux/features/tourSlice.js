import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getTours = createAsyncThunk(
  'tour/getTours',
  async ({ page, searchQuery }, { rejectWithValue }) => {
    try {
      const response = await api.getTours({ page, searchQuery });
      console.log('getTours() - response', response);

      return response.data;
    } catch (error) {
      console.log('getTours() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByTag = createAsyncThunk(
  'tour/getToursByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getToursByTag(tag);
      console.log('getToursByTag() - response', response);

      return response.data;
    } catch (error) {
      console.log('getToursByTag() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getRelatedTours = createAsyncThunk(
  'tour/getRelatedTours',
  async ({ _id, data }, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(_id, data);
      console.log('getRelatedTours() - response', response);

      return response.data;
    } catch (error) {
      console.log('getRelatedTours() - error: ', error);

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

export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(data);
      console.log('createTour() - response', response);

      toast.success('Tour added successfully');
      navigate('/');

      return response.data;
    } catch (error) {
      console.log('createTour() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  'tour/updateTour',
  async ({ _id, data, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(_id, data);
      console.log('updateTour() - response', response);

      toast.success('Tour updated successfully');
      navigate('/');

      return response.data;
    } catch (error) {
      console.log('updateTour() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  'tour/deleteTour',
  async ({ _id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(_id);
      console.log('deleteTour() - response', response);

      toast.success('Tour deleted successfully');

      return response.data;
    } catch (error) {
      console.log('deleteTour() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  'tour/likeTour',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(_id);
      console.log('likeTour() - response', response);

      return response.data;
    } catch (error) {
      console.log('likeTour() - error: ', error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTags = createAsyncThunk(
  'tour/getAllTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllTags();
      console.log('getAllTags() - response', response);

      return response.data;
    } catch (error) {
      console.log('getAllTags() - error: ', error);

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
    tagTours: [],
    relatedTours: [],
    totalTags: [],
    totalToursData: [],
    currentPage: 1,
    searchQuery: '',
    numberOfPages: null,
    error: '',
    loading: false,
  },

  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

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
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.totalToursData = action.payload.totalToursData;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getToursByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload;
    },
    [getToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getRelatedTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    },
    [getRelatedTours.rejected]: (state, action) => {
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

    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;

      const { arg } = action.meta;

      if (arg) {
        state.userTours = state.userTours.map((tour) =>
          tour._id === arg._id ? action.payload : tour
        );
        state.tours = state.tours.filter((tour) =>
          tour._id === arg._id ? action.payload : tour
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      const { arg } = action.meta;

      if (arg) {
        state.userTours = state.userTours.filter(
          (tour) => tour._id !== arg._id
        );
        state.tours = state.tours.filter((tour) => tour._id !== arg._id);
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [likeTour.pending]: (state, action) => {
      state.loading = true;
    },
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false;
      const { arg } = action.meta;

      if (arg) {
        state.tours = state.tours.map((tour) =>
          tour._id === arg._id ? action.payload : tour
        );

        state.relatedTours = state.relatedTours.map((tour) =>
          tour._id === arg._id ? action.payload : tour
        );
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getAllTags.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllTags.fulfilled]: (state, action) => {
      state.loading = false;
      state.totalTags = action.payload;
    },
    [getAllTags.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage, setSearchQuery, clearError } = tourSlice.actions;
export default tourSlice.reducer;
