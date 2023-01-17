import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./AuthForm";
import Account from "./Account";
import Products from "./Products";
import Orders from "./Orders";
import { me } from "../features/authSlice";
import SingleProduct from "./SingleProduct";
import { fetchProductsAsync } from "../features/productsSlice";
import Users from "./Users";
import AdminProducts from "./AdminProducts";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import Cart from "./Cart";
import GuestCart from "./GuestCart";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.admin);
  const userId = useSelector((state) => state.auth.me.id);
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
              <Route path="/account" element={<Account userId={userId}/>} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/account/cart/:userId" element={<Cart userId={userId}/>} />
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
              <Route path="/guestCart" element={ <GuestCart /> } />
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
      )} */}


export default AppRoutes;
