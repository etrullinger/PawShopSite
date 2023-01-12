import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/authSlice';
import productsSlice from '../features/productsSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/authSlice';
