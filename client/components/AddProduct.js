import React, { useState } from "react";
import { addProductAsync } from "../features/productsSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelect } from "@mui/base";
import { selectSingleProduct } from "../features/singleProductSlice";

// const ariaLabel = { "aria-label": "description" };

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductAsync({ name, price, category, description, imageUrl }));
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <>
      <button>
        <Link to={`/admin/products`}>Back to Products</Link>
      </button>
      <div>
        <h1>Add New Product</h1>
      </div>

      <div>
        <form className="product-form" onSubmit={handleSubmit}>
          <label>Product Name:</label>
          <input
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Product Category:</label>
          <input
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label>Price:</label>
          <input
            name="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Image URL</label>
          <input
            name="imageUrl"
            value={imageUrl}
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
