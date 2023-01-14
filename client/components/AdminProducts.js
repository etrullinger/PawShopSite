import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  fetchProductsAsync,
  selectProducts,
} from "../features/productsSlice";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProductAsync(productId));
  };

  return (
    <>
      <div class="control">
        <span>
          <h1>All Products</h1>
          <Link to={"/admin/products/add"}>
            <button type="button" className="linked-button">
              Add Product
            </button>
          </Link>
        </span>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length
            ? products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <Link to={`/admin/products/${product.id}`}>
                      <button class="button is-link edit-button">Edit</button>
                    </Link>
                  </td>
                  <td>
                  <button
                      id="delete-button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};

export default AdminProducts;
