import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './AuthForm';
import Account from './Account';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import { me } from '../features/authSlice';
import SingleProduct from './SingleProduct';
import { fetchProductsAsync } from '../features/productsSlice';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userId = useSelector((state) => state.auth.me.id);
  console.log(userId)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/account" element={<Account userId={userId} />} />
          <Route path="/account/orders/:userId" element={<Orders />} />
          <Route path="/account/cart/:userId" element={<Cart userId={userId} />} />
        </Routes>
      ) : (
        <Routes>

          <Route
            path="/*"
            element={<Products />}
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
          <Route
            path="/products/:productId"
            element={ <SingleProduct /> }
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
