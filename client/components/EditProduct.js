import React, { useState, useEffect } from "react";
import { editProductAsync } from "../features/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { selectSingleProduct } from "../features/singleProductSlice";
import { fetchSingleProductAsync } from "../features/singleProductSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
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
    dispatch(
      editProductAsync({
        name,
        price,
        category,
        description,
        imageUrl,
        productId,
      })
    );
    navigate("/admin/products");
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
        <h1 align="center">Edit Product</h1>
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
            placeholder={product.name}
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
            placeholder={product.price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextField
          focused
          required
            label="Category"
            id="outlined-category"
            value={category}
            placeholder={product.category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <TextField
          focused
            label="Description"
            id="outlined-description"
            value={description}
            placeholder={product.description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
          focused
            label="Image URL"
            id="outlined-imageUrl"
            value={imageUrl}
            placeholder={product.imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br />
          <Button variant="contained" type="submit">
            Update Product
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default EditProduct;
