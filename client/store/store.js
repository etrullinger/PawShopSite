import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/authSlice';
import singleProductSlice from '../features/singleProductSlice.js';
import productsSlice from '../features/productsSlice';
import usersSlice from '../features/usersSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    products: productsSlice,
    users: usersSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/authSlice';
