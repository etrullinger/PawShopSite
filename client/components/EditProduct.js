import React, { useState, useEffect } from "react";
import { editProductAsync } from "../features/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, redirect, useParams } from "react-router-dom";
import { selectSingleProduct } from "../features/singleProductSlice";
import { fetchSingleProductAsync } from "../features/singleProductSlice";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { productId } = useParams();
  const product = useSelector(selectSingleProduct)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId))
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProductAsync({ name, price, description, productId })
    );
    navigate("/admin/products");
  };

  return (
    <div>
      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input
          name="name"
          placeholder={product.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          name="price"
          placeholder={product.price}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          placeholder={product.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
