import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, selectProducts } from "../features/productsSlice";
import { Link } from 'react-router-dom'

const AdminProducts = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  
  const handleDelete = (productId) => {
    dispatch(deleteProductAsync(productId));
  };

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products && products.length
          ? products.map((product) => (
              <div key={product.id} className="product">
                <li>
                  <div>
                    <span>
                      ProductID: {product.id}, Name: {product.name}, Price: $
                      {product.price}
                    </span>
                      <Link to={`/admin/products/${product.id}`}>
                      <button type="button" className="linked-button">Edit</button>
                      </Link>
                      <button
                      id="delete-button"
                      onClick={() => handleDelete(product.id)}
                      >Delete
                      </button>
                  </div>
                </li>
              </div>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AdminProducts;
