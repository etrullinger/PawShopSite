import React, { useState } from "react";
import { addProductAsync } from "../features/productsSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <div>
      <Button
        component={Link}
        to={`/admin/products`}
        variant="outlined"
        size="small"
        sx={{ textTransform: "none" }}
      >
        Back to Products
      </Button>
      <div>
        <h1 align="center">Add New Product</h1>
      </div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "ch" },
        }}
        noValidate
        autoComplete="off"
        align="center"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            focused
            required
            id="outlined-product-name"
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextField
            focused
            required
            id="outlined-price"
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextField
            focused
            required
            label="Category"
            id="outlined-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <TextField
            focused
            label="Description"
            id="outlined-description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            focused
            label="Image URL"
            id="outlined-imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br />
          <Button variant="contained" type="submit">
            Submit Product
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddProduct;
