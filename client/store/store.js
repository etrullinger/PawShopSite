import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/authSlice';
import singleProductSlice from '../features/singleProductSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/authSlice';
