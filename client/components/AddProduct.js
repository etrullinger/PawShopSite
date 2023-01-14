import React, { useState } from "react";
import { addProductAsync } from "../features/productsSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <label htmlFor="name">Product Name:</label>
          <input
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Product Category:</label>
          <input
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label htmlFor="imageUrl">Image URL</label>
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
