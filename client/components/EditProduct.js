import React, { useState, useEffect } from "react";
import { editProductAsync } from "../features/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { selectSingleProduct } from "../features/singleProductSlice";
import { fetchSingleProductAsync } from "../features/singleProductSlice";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// const ariaLabel = { "aria-label": "description" };

const EditProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProductAsync({ name, price, category, description, imageUrl, productId }));
    navigate("/admin/products");
  };

  return (
    <div>
      <Button variant="contained" className="is-linked">
        <Link to={`/admin/products`} className="is-linked">
          Back to Products
        </Link>
      </Button>
      <div>
        <h1 align="center">Edit Product</h1>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <label >Product Name:</label>
        <input
          name="name"
          placeholder={product.name}
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label >Price:</label>
        <input
          name="price"
          value={price}
          placeholder={product.price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label>Category:</label>
        <input
          name="category"
          value={category}
          placeholder={product.category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label >Description:</label>
        <textarea
          name="description"
          value={description}
          placeholder={product.description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label>Image URL:</label>
        <input
          name="imageUrl"
          value={imageUrl}
          placeholder={product.imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
