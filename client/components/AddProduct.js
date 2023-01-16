import React, { useState } from "react";
import { addProductAsync } from "../features/productsSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const ariaLabel = { 'aria-label': 'description' };

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
      <Button variant="contained" className="is-linked">
        <Link to={`/admin/products`} className="is-linked">Back to Products</Link>
      </Button>
      <div>
        <h1 align="center">Add New Product</h1>
      </div>

      <div>
        <Box className="form" component="form" align="center" sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name:</label>
          <Input
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Product Category:</label>
          <Input
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price:</label>
          <Input
            name="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <TextField
            name="description"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label htmlFor="imageUrl">Image URL</label>
          <Input
            name="imageUrl"
            value={imageUrl}
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br />
          <Button variant="contained" type="submit">Submit</Button>
        </Box>
      </div>
    </>
  );
};

export default AddProduct;
