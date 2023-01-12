import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './AuthForm';
import Home from './Home';
import { me } from '../features/authSlice';
import Products from './Products';
import { fetchProductsAsync, selectProducts } from '../features/productsSlice';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  const products = useSelector(selectProducts)

  useEffect(() => {
    dispatch(me());
    dispatch(fetchProductsAsync())
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />

          <Route
            path='/products'
            element={ <Products />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
