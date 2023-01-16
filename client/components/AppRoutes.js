import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./AuthForm";
import Account from "./Account";
import Products from "./Products";
import Orders from "./Orders";
import { me } from "../features/authSlice";
import SingleProduct from "./SingleProduct";
import { fetchProductsAsync, selectProducts } from "../features/productsSlice";
import Users from "./Users";
import AdminProducts from "./AdminProducts";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      {(() => {
        if (isLoggedIn && !isAdmin) {
          return (
            <Routes>
              <Route path="/*" element={<Products />} />
              <Route path="/products/:productId" element={<SingleProduct />} />
              <Route to="/account" element={<Account />} />
              <Route to="/account/orders" element={<Orders />} />
            </Routes>
          );
        } else if (isLoggedIn && isAdmin) {
          return (
            <Routes>
              <Route path="/*" element={<Products />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/products/:productId" element={<EditProduct />} />
              <Route path="/admin/products/add" element={<AddProduct />} />
            </Routes>
          );
        } else {
          return (
            <Routes>
              <Route path="/*" element={<Products />} />
              <Route
                path="/login"
                element={<AuthForm name="login" displayName="Login" />}
              />
              <Route
                path="/signup"
                element={<AuthForm name="signup" displayName="Sign Up" />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<SingleProduct />} />
            </Routes>
          );
        }
      })()}
         </div>
  );
};
      {/* {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Products />} />
          <Route to="/account" element={<Account />} />
          <Route to="/account/orders" element={<Orders />} />
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
      )} */}
 

export default AppRoutes;
