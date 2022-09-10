import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import tourReducer from './features/tourSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
  },
});
