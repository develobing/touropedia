import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import profileReducer from './features/profileSlice';
import tourReducer from './features/tourSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tour: tourReducer,
  },
});
