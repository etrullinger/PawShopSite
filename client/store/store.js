import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/authSlice';
import singleProductReducer from '../features/singleProductSlice.js';
import productsReducer from '../features/productsSlice';
import usersReducer from '../features/usersSlice';
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductReducer,
    products: productsReducer,
    users: usersReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/authSlice';
