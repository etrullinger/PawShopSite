import React, { useState, useEffect } from "react";
import { editProductAsync } from "../features/singleProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { selectSingleProduct } from "../features/singleProductSlice";
import { fetchSingleProductAsync } from "../features/singleProductSlice";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


const ariaLabel = { 'aria-label': 'description' };

const EditProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
      <Button variant="contained" className="is-linked">
        <Link to={`/admin/products`} className="is-linked">Back to Products</Link>
      </Button>
      <div>
        <h1 align="center">Edit Product</h1>
      </div>

      <Box className="form" component="form" align="center" sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <Input
          name="name"
          defaultValue={product.name}
          placeholder={product.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="category">Product Category:</label>
          <Input
            name="category"
            defaultValue={product.category}
            placeholder={product.category}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
        <label htmlFor="price">Price:</label>
        <Input
          name="price"
          defaultValue={product.price}
          placeholder={product.price}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <TextField
          name="description"
          variant="standard"
          defaultValue={product.description}
          placeholder={product.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="imageUrl">Image URL</label>
          <Input
            name="imageUrl"
            defaultValue={product.imageUrl}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br />
        <Button variant="contained" type="submit">Update Product</Button>
      </Box>
    </div>
  );
};

export default EditProduct;
